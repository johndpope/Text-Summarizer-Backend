from __future__ import print_function
from future import standard_library
standard_library.install_aliases()
import sys
sys.path.append('../Modules')
from builtins import object
import nltk
import string
from nltk.corpus import stopwords
from nltk import re
from urllib.request import urlopen
from unidecode import unidecode


class ParagraphProcessor(object):
	"""
	A class that deals with texts as a list of paragraphs
	"""
	porter = nltk.PorterStemmer()
	stopWords = set(stopwords.words('english'))
	punctuationList = [p for p in string.punctuation]

	def tokenize(self, txt):
		"""
		Tokenize a list of paragraphs
		@params txt: the paragraphs of the target text
		@rtype: {List}
		"""
		pargraphs = []
		for par in txt:
			pargraphs.append(nltk.word_tokenize(par))
		return pargraphs

	def porterStemmer(self, txt):
		"""
		Stem a list of paragraphs
		@params txt: the paragraphs of the target text
		@rtype: {List}
		"""
		sentences = []
		pargraphs = []
		for par in txt:
			sentences = [self.porter.stem(word) for word in par]
			pargraphs.append(sentences)
			sentences = []
		return pargraphs

	def caseFolding(self, allPars):
		"""
		Normalize the case of each sentence in the paragraphs
		@params txt: the paragraphs of the target text
		@rtype: {List}
		"""
		fold = [] ;
		sentences = ""
		for par in allPars:
			sentences = ''.join(letter.lower() for letter in par)
			fold.append(sentences)
			sentences = ""
		return fold

	def removeStopWords(self, txt):
		"""
		Remove stop-words from each paragraph
		@params txt: the paragraphs of the target text
		@rtype: {List}
		"""
		sentences = []
		pargraphs = []
		for par in txt:
			for word in par:
				if word not in self.stopWords:
					sentences.append(word)
			pargraphs.append(sentences)
			sentences = []
		return pargraphs

	def removePunctuation(self, txt):
		"""
		Remove punctuations from each paragraph
		@params txt: the paragraphs of the target text
		@rtype: {List}
		"""
		pargraphs = [] ;
		sentences = ""
		for par in txt:
			sentences = "".join([letter for letter in par if letter not in self.punctuationList])
			pargraphs.append(sentences)
			sentences = ""
		return pargraphs

	def removePuncSent(self, txt):
		"""
		Remove Punctuations from tokenized sentences
		@params txtTokens: the tokens of the target text
		@rtype: {List}
		"""
		sents = []
		sent = []
		str = ""
		for s in txt:
			for w in s:
				if w not in self.punctuationList:
					sent.append(w)
			sents.append(sent)
			sent = []
		return sents

	def removeUnicode(self, txt):
		"""
		Remove unicode symbols from each paragraph
		@params txt: the paragraphs of the target text
		@rtype: {List}
		"""
		sentences = []
		pargraphs = []
		for par in txt:
			sentences = [unidecode(word) for word in par]
			pargraphs.append(sentences)
			sentences = []
		return pargraphs

	def processParagraph(self, txt):
		"""
		Perform all procecessing functions for a given raw text
		@params txt: the raw target text
		@rtype: {List}
		"""
		pargraphs = txt.split("\n\n")
		foldCase = self.caseFolding(pargraphs)
		punctuationLess = self.removePunctuation(foldCase)
		tokens = self.tokenize(punctuationLess)
		stopLess = self.removeStopWords(tokens)
		uni = self.removeUnicode(stopLess)
		punctuationLess2 = self.removePuncSent(uni)
		stem = self.porterStemmer(punctuationLess2)
		return stem



class SentenceProcessor(object):
	"""
	A class that deals with texts as a list of sentences
	"""
	porter = nltk.PorterStemmer()
	stopWords = set(stopwords.words('english'))
	punctuationList = [p for p in string.punctuation]

	def caseFoldingSent(self, allSents):
		"""
		Normalize the case of each sentence
		@params txt: the target text as a string
		@rtype: {List}
		"""
		sentences = []
		sentence = []
		str = ""
		for sent in allSents:
			for word in sent:
				for letter in word:
					str += letter.lower()
				sentence.append(str)
				str = ""
			sentences.append(sentence)
			sentence = []
		return sentences

	def removeStopWordsSent(self, txt):
		"""
		Remove stop-words from the sentences of a text
		@params txt: the target text
		@rtype: {List}
		"""
		sents = []
		sent = []
		str = ""
		for s in txt:
			for w in s:
				if w not in self.stopWords:
					sent.append(w)
			sents.append(sent)
			sent = []
		return sents

	def removePuncSent(self, txt):
		"""
		Remove Punctuations from tokenized sentences
		@params txtTokens: the tokens of the target text
		@rtype: {List}
		"""
		sents = []
		sent = []
		str = ""
		for s in txt:
			for w in s:
				if w not in self.punctuationList:
					sent.append(w)
			sents.append(sent)
			sent = []
		return sents

	def removeUnicodeSent(self, txt):
		"""
		Remove unicode symbols from senctences tokens
		@params txtTokens: the tokens of the target text
		@rtype: {List}
		"""
		sents = []
		sent = []
		for s in txt:
			sent = [unidecode(word) for word in s]
			sents.append(sent)
			sent = []
		return sents

	def porterStemmerSent(self, txt):
		"""
		Use Porter stemmer to stem the sentences of a text
		@params txtTokens: the tokens of the text
		@rtype: {List}
		"""
		sents = []
		sent = []
		for s in txt:
			sent = [self.porter.stem(word) for word in s]
			sents.append(sent)
			sent = []
		return sents

	def processSentences(self, txt):
		"""
		Take the sentences of a text, perform preprocessing and return the tokenized cleaned version of the text
		@params txt: the target text
		@rtype: {List}
		"""
		foldText = self.caseFoldingSent(txt)
		stopText = self.removeStopWordsSent(foldText)
		puncText = self.removePuncSent(stopText)
		unicodeText = self.removeUnicodeSent(puncText)
		stemText = self.porterStemmerSent(unicodeText)
		finalText = self.removePuncSent(stemText)
		return finalText



class WordProcessor(object):
	"""
	A class that deals with texts as a list of words
	"""
	def tokenizeLocalTxt(self, txt):
		"""
		Tokenize an local text
		@params txt: the words of the text as a string
		@rtype: {List}
		"""
		return nltk.word_tokenize(txt)

	def porterStemmer(self, txtTokens):
		"""
		Use Porter stemmer to stem a text
		@params txtTokens: the tokens of the text
		@rtype: {List}
		"""
		porter = nltk.PorterStemmer()
		return [porter.stem(t) for t in txtTokens]

	def caseFolding(self, txt):
		"""
		Normalize the case of each word
		@params txt: the target text as a string
		@rtype: {String}
		"""
		foldedTxt = [letter.lower() for letter in txt]
		return ''.join(foldedTxt)

	def removeStopWords(self, txt):
		"""
		Remove stop-words from a text
		@params txt: the target text
		@rtype: {List}
		"""
		stopWords = set(stopwords.words('english'))
		tokens = self.tokenizeLocalTxt(txt)
		filteredText = [word for word in tokens if not word in stopWords]
		return filteredText

	def removePunc(self, txtTokens):
		"""
		Remove Punctuations from a tokenized text
		@params txtTokens: the tokens of the target text
		@rtype: {List}
		"""
		punc = string.punctuation
		puncList = [p for p in punc]
		return [word for word in txtTokens if word not in puncList]

	def removeUnicode(self, txtTokens):
		"""
		Remove unicode symbols from text tokens
		@params txtTokens: the tokens of the target text
		@rtype: {List}
		"""
		return [unidecode(word) for word in txtTokens]

	def processRawText(self, txt):
		"""
		Take the raw text, perform preprocessing and return the tokenized cleaned version of the text
		@params txt: the target text
		@rtype: {List}
		"""
		foldText = self.caseFolding(txt)
		stopText = self.removeStopWords(foldText)
		puncText = self.removePunc(stopText)
		stemText = self.porterStemmer(puncText)
		unicodeText = self.removeUnicode(stemText)
		finalText = self.removePunc(unicodeText)
		return finalText



class ProcessingTools(object):
	def myTokenizer(self, txt):
		"""
		Constructing a tokenizer based on regular expressions
		@params txt: the words of the text as a string
		@rtype: {List}
		"""
		return re.findall(r"\w+(?:[-']\w+)*|'|[-.(]+|\S\w*", txt)

	def lancasterStemmer(self, txtTokens):
		"""
		Use Lancaster stemmer to stem a text
		@params txtTokens: the tokens of the text
		@rtype: {List}
		"""
		lancaster = nltk.LancasterStemmer()
		[lancaster.stem(t) for t in tokens]

	def stringifySent(self, txt):
		"""
		Strigify a list of lists of sentences
		@params txt: te tokens of the target text
		@rtype: {String}
		"""
		str = ""
		for sent in txt:
			for w in sent:
				str += w + " "
			str += "\n"
		return str

	def saveProcessedSent(self, text, fileName):
		"""
		Save the processed sentences into a file
		@params text: the tokens of the target text
		@params fileName: the name and extension of the file
		"""
		outputFile = open(fileName, 'w')
		stringifiedText = self.stringifySent(text)
		outputFile.write(stringifiedText)
		print("The text is written successfully!")

	def normalizeFirstWord(self, text):
		"""
		Sets the first word of a sentence in lower case after removing unicode and punctuation
		@params text: the sentences of the target text
		@rtype {List}: the tokenized text
		"""
		sentPro = SentenceProcessor()
		wordPro = WordProcessor()
		uni = sentPro.removeUnicodeSent(text)
		punc = sentPro.removePuncSent(uni)
		counter = 0
		text = []
		sent = []
		for sentence in punc:
		    for word in sentence:
		        if counter == 0:
		            sent.append(wordPro.caseFolding(word))
		            counter+=1
		        else:
		            sent.append(word)
		            counter+=1
		    text.append(sent)
		    sent = []
		    counter = 0
		return text

	def discoursePreprocessing(self, text):
		"""
		Processes text for discourse feature
		@params text: sentence-tokenized text
		@rtype {List}: list of cleaned tokens
		"""
		sentPro = SentenceProcessor()
		fold = sentPro.caseFoldingSent(text)
		uni = sentPro.removeUnicodeSent(fold)
		punc = sentPro.removePuncSent(uni)
		txt = []
		for sent in punc:
		    txt.append(" ".join(sent))
		return txt

	def mainConceptPreprocessing(self, text):
		"""
		Processes text for main concept indicator
		@params text: sentence-tokenized text
		@rtype {List}: list of cleaned tokens
		"""
		sentPro = SentenceProcessor()
		fold = sentPro.caseFoldingSent(text)
		uni = sentPro.removeUnicodeSent(fold)
		punc = sentPro.removePuncSent(uni)
		return punc
