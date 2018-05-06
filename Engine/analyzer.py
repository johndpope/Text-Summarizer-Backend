import nltk
from nltk import FreqDist
from nltk import ConditionalFreqDist
from nltk.corpus import brown
from nltk.corpus import inaugural
from nltk.corpus import PlaintextCorpusReader



class Analyzer:
	"""
	Performs some analytical operations
	"""
	def createCorpus(self, root):
		"""
		@param root: The directory of the local corpus
		@rtype: {list}
		"""
		wordslist = PlaintextCorpusReader(root, '.*')
		print "---------------------------------------"
		print wordslist.fileids()
		print "---------------------------------------"
		return wordslist

	def count(self, corpusName ,textId):
		"""
		make simple statistics based on number of words/characters/...
		@param corpusName: the main corpus which contains the desired text
		@param textId: the id of the text to find info about
		"""
		num_chars = len(corpusName.raw(textId))
		num_words = len(corpusName.words(textId))
		num_sents = len(corpusName.sents(textId))
		print "# of characters = ", num_chars
		print "# of words = ", num_words
		print "# of sentences = ", num_sents
		print "avg word length = ", num_chars/num_words, "characters"
		print "avg sentence length = ", num_words/num_sents, "words"

	def countSpecificWords(self, corpusName ,textId, theWords):
		"""
		find the distribution of a word within a text
		@param corpusName: the main corpus which contains the desired text
		@param textId: the id of the text to find info about
		"""
		text = corpusName.words(textId)
		fdist = FreqDist([word.lower() for word in text])
		for w in theWords:
			print w + ':', fdist[w], "\n"

	def tabulateWordsInAllGeners(self, theWords):
		"""
		find the distribution of a word within all Brown corpus genres
		@params theWord: the word/list of words to find info about
		"""
		cdf = ConditionalFreqDist(
			(genre, word)
			for genre in brown.categories()
			for word in brown.words(categories = genre)
			)
		cdf.tabulate(samples = theWords, conditions= brown.categories())

	def tabulateWordsInPeriods(self, theWords):
		"""
		find the distribution of words within the years, based in Inaugural corpus
		@params theWords: the word/list of words to find info about
		"""
		cdf = ConditionalFreqDist(
			(textid[:4], target)
			for textid in inaugural.fileids()
			for word in inaugural.words(textid)
			for target in theWords
			if word.lower().startswith(target) or word.lower().endswith(target)
			)
		cdf.tabulate()

	def generateText(self, text, word, num=15):
		"""
		Generate semi-random text based on what's the likelihood of two words to appear together
		depending on the frequency distribution of a text bigrams
		@params text: the target text
		@params word: the seed word
		@params num: the length of the generated text, set to 15 as a default
		"""
		bigrams = nltk.bigrams(text)
		cfdist = ConditionalFreqDist(bigrams)
		for i in range(num):
			print word,
			word = cfdist[word].max()

	def lexDiversity(self, text):
		"""
		Check the lexical diversity of a text
		@params text: the target text
		"""
		wordCount = len(text)
		numOfWords = len(set(text))
		diversity = wordCount/numOfWords
		print "\nThe lexical diversity score = ", diversity

	def unusualWords(self, text):
		"""
		Get the unusual words from a text based on nltk.words
		@params text: the target text
		@rtype: {list}
		"""
		textWords = set(w.lower() for w in text if w.isalpha())
		englishWords = set(w.lower() for w in nltk.corpus.words.words())
		unusual = textWords.difference(englishWords)
		return sorted(unusual)

	def plural(self, word):
		"""
		Take a single word and display its plural
		@params word: the word in single
		"""
		if word.endswith('y'):
			return word[:-1] + 'ies'
		elif word.endswith('an'):
			return word[:-2] + 'en'
		elif word.endswith('sx') or word[-2:] in ['sh', 'ch']:
			return word[:-2] + 'es'
		else:
			return word + 's'
