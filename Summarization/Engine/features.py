from __future__ import division
import sys
sys.path.append('../Modules')
import nltk
import re
import math
import numpy
from collections import Counter
from nltk import FreqDist
from nltk import ConditionalFreqDist
from tokenizer import *
from analyzer import *
from DiscourseMarkers import *
from collections import OrderedDict



def textSentencesLength(txt):
	"""
	Find the length of sentences in text, print the longest and shortest one, and show the frequency distribution of lengths
	@params txt: the tokens of the target text
	@rtype: {List}
	"""
	sentencesLength = []
	for sentence in txt:
		sentencesLength.append(len(sentence))
	#print "The longest sentence is ", txt[sentencesLength.index(max(sentencesLength))]
	#print "The shortest sentence is", txt[sentencesLength.index(min(sentencesLength))]
	frequencyDistribution = FreqDist(length for length in sentencesLength)
	#frequencyDistribution.plot()
	#frequencyDistribution.tabulate(samples=frequencyDistribution.keys())
	return sentencesLength;

def weightMap(position):
	"""
	Takes a position and gives it the proper weight
	@params position: the position of the sentence within the text
	@rtype {Float}
	"""
	weight = 0
	if position > 0.0 and position <= 0.1:
		weight = 0.17
	elif position > 0.1 and position <= 0.2:
		weight = 0.23
	elif position > 0.2 and position <= 0.3:
		weight = 0.14
	elif position > 0.3 and position <= 0.4:
		weight = 0.08
	elif position > 0.4 and position <= 0.5:
		weight = 0.05
	elif position > 0.5 and position <= 0.6:
		weight = 0.04
	elif position > 0.6 and position <= 0.7:
		weight = 0.06
	elif position > 0.7 and position <= 0.8:
		weight = 0.04
	elif position > 0.8 and position <= 0.9:
		weight = 0.04
	elif position > 0.9 and position <= 1.0:
		weight = 0.15
	return weight

def weightSentencePosition(txt):
	"""
	Assign the proper weight for each sentence in the text
	@params txt: the target tokenized text, the tokenization is based on sentences' separation
	@rtype {List}: list of weights, each one represents sentence's weight
	"""
	numOfSentences = len([sentence for sentence in txt if sentence])
	normalizedPosition = [(txt.index(sentence)/numOfSentences) for sentence in txt if sentence]
	weightedPosition = [weightMap(position) for position in normalizedPosition]
	return weightedPosition

def cosineSimilarity(title, sentence):
	"""
	Applies the cosine similarity function between the title and a given sentence
	@params title: the tokenized title
	@params sentence: the tokenized target text
	@rtype {Float}: the percentage of similarity
	"""
	title = Counter(title)
	sentence = Counter(sentence)
	sharedWords = set(title.keys()) & set(sentence.keys())
	firstTerm = sum([title[word] * sentence[word] for word in sharedWords])
	firstSum = sum([title[word]**2 for word in list(title.keys())])
	secondSum = sum([sentence[word]**2 for word in list(sentence.keys())])
	secondTerm = math.sqrt(firstSum) * math.sqrt(secondSum)
	if not secondTerm:
		return 0.0
	else:
		return firstTerm/secondTerm

def jaccardSimilarity(title, sentence):
	"""
	Applies Jaccard's similarity function to the title and a given sentence
	@params title: the tokenized title
	@params sentence: the tokenized target text
	@rtype {Float}: the percentage of similarity
	"""
	intersection = len(set(set(title) & set(sentence)))
	union = len(set(set(title) | set(sentence)))
	if not union:
		return 0.0
	else:
		return intersection/union


def measureTitleSimilarity(title, tokenizedTxt):
	"""
	Tokenizes and stems the title, then applies the cosine similarity measure for each sentence in the text
	@params title: the title of the text as a string
	@params tokenizedTitle: the tokenized text - the tokenization should be based on sentences separation
	@rtype {List}: list of similarity percentage values, each one represents sentence's similarity to title
	"""
	wordProc = WordProcessor()
	tokenizedTitle = wordProc.processRawText(title)
	similarities = [round(cosineSimilarity(sentence, tokenizedTitle),3) for sentence in tokenizedTxt]
	return similarities

def measureArabicTitleSimilarity(title, tokenizedTxt):
	"""
	Tokenizes an arabic title, then applies the cosine similarity measure for each sentence in the text
	@params title: the title of the text as a string
	@params tokenizedTitle: the tokenized text - the tokenization should be based on sentences separation
	@rtype {List}: list of similarity percentage values, each one represents sentence's similarity to title
	"""
	tokenizedTitle = nltk.word_tokenize(title)
	similarities = [round(cosineSimilarity(sentence, tokenizedTitle),3) for sentence in tokenizedTxt]
	return similarities

def measureKeywordsSimilarity(keywords, tokenizedTxt):
	"""
	Stems the keywords, and applies the cosine similarity measure for each sentence in the text
	@params keywords: a list of tags/keywords that describe the text
	@params tokenizedTitle: the tokenized text - the tokenization should be based on sentences separation
	@rtype {List}: list of similarity percentage values, each one represents sentence's similarity to keywords
	"""
	wordProc = WordProcessor()
	stemKeywords = wordProc.porterStemmer(keywords)
	similarities = [round(cosineSimilarity(sentence, stemKeywords),3) for sentence in tokenizedTxt if sentence]
	return similarities


def termFreq(word, tokenizedSentence):
	"""
	Calculates the frequency of a word within a sentence
	@params word: a specific word in the text
	@params tokenizedSentence
	@rtype {Int}
	"""
	return tokenizedSentence.count(word)

def augmentedTermFreq(word, tokenizedSentence):
	"""
	Normalizes the frequency by weighting a word according to sentence length
	@params word: a specific word in the text
	@params tokenizedSentence
	@rtype {Float}
	"""
	maxCount = max([termFreq(w, tokenizedSentence) for w in tokenizedSentence])
	return (0.5 + ((0.5 * termFreq(word, tokenizedSentence))/maxCount))

def inverseSentFreq(tokenizedText):
	"""
	Weighting every word in the text according to its uniqueness in the text
	@params tokenizedText
	@rtype {List}
	"""
	isf = {}
	allTokens = set([word for sentence in tokenizedText for word in sentence])
	for token in allTokens:
		containToken = [token in sent for sent in tokenizedText]
		isf[token] = 1 + math.log(len(tokenizedText)/(sum(containToken)))
	return isf

def termFreqInverseSentFreq(tokenizedText):
	"""
	Creates vector representation of the sentences in the text based on TF/ISF
	@params tokenizedText
	@rtype {List}
	"""
	isf = inverseSentFreq(tokenizedText)
	tfisfSentences = []
	for sent in tokenizedText:
		tfisfSent = []
		for word in sent:
			tf = augmentedTermFreq(word, sent)
			tfisfSent.append(tf * isf[word])
		tfisfSentences.append(tfisfSent)
	return tfisfSentences

def meanTermFreq(tokenizedText):
	"""
	Computes the mean value of TS/ISF for each sentence in the text
	@params tokenizedText
	@rtype {List}
	"""
	tfisf = termFreqInverseSentFreq(tokenizedText)
	meanTfisf = []
	for frequency in tfisf:
		mean = round(numpy.mean(frequency),3)
		if math.isnan(mean):
			meanTfisf.append(0.0)
		else:
			meanTfisf.append(mean)
	return meanTfisf

def sentToSentCohesion(tokenizedText):
	"""
	Computes and normalizes cohesion values based on the similarity between each sentence and all other sentences in the tokenized text
	@params tokenizedText
	@rtype {List}
	"""
	allSentsCohesion = []
	sumSimilarity = 0
	for sent in tokenizedText:
		for s in tokenizedText:
			if sent and s and sent != s:
				singleSim = cosineSimilarity(sent, s)
				sumSimilarity += singleSim
		allSentsCohesion.append(sumSimilarity)
		sumSimilarity = 0
	maxCohesion = max(allSentsCohesion)
	if maxCohesion == 0:
		normalizedCohesion = [0.0 for cohesion in allSentsCohesion]
	else:
		normalizedCohesion = [round(cohesion/maxCohesion,3) for cohesion in allSentsCohesion]
	return normalizedCohesion


def sentToCentroidCohesion(tokenizedText):
	"""
	Computes and normalizes cohesion values based on the similarity between the centroid of the text and all other sentences in the tokenized text
	@params tokenizedText
	@rtype {List}
	"""
	indexSum = 0 ;
	for sent in tokenizedText:
		indexSum += tokenizedText.index(sent)
	centroidIndex = int(indexSum/len(tokenizedText))
	centroidSent = tokenizedText[centroidIndex]
	cohesionValues = [cosineSimilarity(centroidSent, sent) for sent in tokenizedText]
	maxCohesion = max(cohesionValues)
	if maxCohesion == 0:
		normalizedCohesion = [0.0 for cohesion in cohesionValues]
	else:
		normalizedCohesion = [round(cohesion/maxCohesion,3) for cohesion in cohesionValues]
	return normalizedCohesion

def discourseIndex(txtSents):
	"""
	Compares each sentence in the text with a list of discourse markers, return true if any one exists and fale otherwise
	Discourse markers' list is defined manualy in a separate file
	@params txtSents: a list of text's sentences as a string
	@rtype {List}: a boolean list, each entry represents a sentence and its discourse score
	"""
	#print len(txtSents)
	discourseMarkers = [" ".join(marker) for marker in markers]
	markerScore = []
	index = False
	for sent in txtSents:
		for marker in discourseMarkers:
			if sent.startswith(marker):
				index = True
				markerScore.append(True)
				break
		if not index:
			markerScore.append(False)
		index = False
	return booleanToFloat(markerScore)

def extractSentNouns(tokenizedSent):
	"""
	Finds all nouns in a sentence
	@params tokenizedSent: the tokenized target sentence
	@rtype {List}: list of nouns found in a sentence
	"""
	isNoun = lambda pos: pos == 'NN' or pos == 'NNS'
	nouns = [word for (word, pos) in nltk.pos_tag(tokenizedSent) if isNoun(pos)]
	return nouns

def extractSentProperNouns(tokenizedSent):
	"""
	Finds all proper nouns in a sentence
	@params tokenizedSent: the tokenized target sentence
	@rtype {List}: list of proper nouns found in a sentence
	"""
	isNoun = lambda pos: pos == 'NNP' or pos == 'NNPS'
	nouns = [word for (word, pos) in nltk.pos_tag(tokenizedSent) if isNoun(pos)]
	return nouns

def extractTextNouns(tokenizedTxt):
	"""
	Finds all nouns in the text
	@params tokenizedTxt: the tokenized target text
	@rtype {List}: list of all nouns in text
	"""
	nounsList = []
	for sent in tokenizedTxt:
		nouns = extractSentNouns(sent)
		if nouns:
			for noun in nouns:
				nounsList.append(noun)
	return nounsList

def extractTextProperNouns(tokenizedTxt):
	"""
	Finds all proper nouns in the text
	@params tokenizedTxt: the tokenized target text
	@rtype {List}: list of all proper nouns in text
	"""
	nounsList = []
	for sent in tokenizedTxt:
		nouns = extractSentProperNouns(sent)
		if nouns:
			for noun in nouns:
				nounsList.append(noun)
	return nounsList

def buildNounsDictionary(nounsList):
	"""
	Builds a dictionary list that maps every noun in the text to its count
	@params nounsList: the list of all nouns in the text
	@rtype {List}: list of dictionaries
	"""
	nounDict = []
	distinctNouns = set(nounsList)
	for noun in distinctNouns:
		nounOccurance = nounsList.count(noun)
		dictEntry = {'noun': noun, 'count': nounOccurance}
		nounDict.append(dictEntry)
	return nounDict

def getTopNouns(nounsDict):
	"""
	Finds the top 15 nouns with the highest count
	@params nounsDict: list of nouns dictionaries
	@rtpe {List}: list of strings
	"""
	sortedNouns = sorted(nounsDict, key=lambda k: k['count'])
	topNouns = sortedNouns[len(sortedNouns)-15:]
	extractedNouns = [noun['noun'] for noun in topNouns]
	return extractedNouns

def mainConceptIndicator(tokenizedTxt):
	"""
	Scores every sentence in text according to the existance of the top 15 nouns
	@params tokenizedTxt: the target tokenized text
	@rtype {List}: list of bolean values which indicated the occurance of at least on of the top 15 words
	"""
	nounsList = extractTextNouns(tokenizedTxt)
	nounsDict = buildNounsDictionary(nounsList)
	topNouns = getTopNouns(nounsDict)
	txtScore = []
	flag = False
	for sent in tokenizedTxt:
		for noun in topNouns:
			if noun in sent:
				flag = True
				txtScore.append(True)
				break
		if not flag:
			txtScore.append(False)
		flag = False
	return booleanToFloat(txtScore)

def properNounsIndicator(tokenizedTxt):
	"""
	Scores every sentence in text according to the existance of atleast one proper noun
	@params tokenizedTxt: the target tokenized text
	@rtype {List}: list of bolean values which indicated the occurance of at least on one proper noun
	"""
	nounsList = extractTextProperNouns(tokenizedTxt)
	#print "The proper nouns are:"
	#print "---------------------"
	#print nounsList
	txtScore = []
	flag = False
	for sent in tokenizedTxt:
		for noun in nounsList:
			if noun in sent:
				flag = True
				txtScore.append(True)
				break
		if not flag:
			txtScore.append(False)
		flag = False
	return booleanToFloat(txtScore)

def booleanToFloat(valuesList):
	"""
	Converts boolean list into a float list
	@params valuesList: a boolean list
	@rtype {List}: a list of float values
	"""
	floatList = []
	for value in valuesList:
		if value:
			floatList.append(1.0)
		else:
			floatList.append(0.0)
	return floatList
