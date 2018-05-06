import nltk
import pickle
from tokenizer import *
from features import *
from scorer import *
from trainer import *
from predicter import *
from gensim.summarization.summarizer import summarize



def getTestingData():
    """
    Gets the prepared data for testing
    @rtype {Dictionary}
    """
    documents = getArticlesScore()
    trainingData = documents[len(documents)/2:]
    return trainingData

def gensimSummarizer():
    """
    Summarizes the test set and adds the summary to each articles' Dictionary
    @rtype {List}: list of summaries, each one is presented by a string
    @rtype {Dictionary}
    """
    trainingData = getTestingData()
    summaries = []
    docs = []
    for doc in trainingData:
        text = doc['raw']
        summary = summarize(text, ratio=0.5)
        summaries.append(summary)
        doc['summary'] = summary
    return summaries, trainingData

def getSummarizedSents():
    """
    Tokenizes all test sets' summaries (sentence based tokenization)
    @rtype {List}: list(summary) of lists(sentences)
    """
    summaries, docs = gensimSummarizer()
    tokenizedSummaries = []
    for i, summary in enumerate(summaries):
        tokenizedSum = nltk.sent_tokenize(summary)
        tokenizedSummaries.append(tokenizedSum)
    return tokenizedSummaries

def saveTestingData():
    """
    Serializes summaries, and test data and stores them
    """
    summaries, dataInfo =  gensimSummarizer()
    tokenizedSummaries = getSummarizedSents()
    summaryFile = '../Data/test_data.dat'
    dataFile = '../Data/test_dataset_info.dat'
    openedSumFile = open(summaryFile, 'wb')
    pickle.dump(tokenizedSummaries, openedSumFile)
    openedSumFile.close()
    openedDataFile = open(dataFile, 'wb')
    pickle.dump(dataInfo, openedDataFile)
    openedDataFile.close()

def loadTestingData():
    """
    Loads summaries and test data info
    @rtype {List}: list of tokenized summaries
    @rtype {Dictionary}: all info about every sentence in documents
    """
    summaryFile = '../Data/test_data.dat'
    dataFile = '../Data/test_dataset_info.dat'
    openedSumFile = open(summaryFile, 'r')
    openedDataFile = open(dataFile, 'r')
    summaries = pickle.load(openedSumFile)
    data = pickle.load(openedDataFile)
    return summaries, data

def testData():
    """
    Computes the accuracy of summarization
    """
    summaries, data = loadTestingData()
    tags = tagSentences(summaries, data)
    tuples = matchTagsWithFeatures(tags, data)
    classifier = classifyData()
    accuracy = nltk.classify.accuracy(classifier, tuples)
    return accuracy


#saveTestingData()
accuracy = testData()
print "The accuracy of summarizing after testing 1825 samples is : " , accuracy
