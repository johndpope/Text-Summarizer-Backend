from __future__ import print_function
import nltk
import pickle
import sys
sys.path.append('../')
from tokenizer import *
from features import *
from arabic_scorer import *
from arabic_trainer import *
from gensim.summarization.summarizer import summarize



def saveTestingData():
    """
    Serializes summaries, and test data and stores them
    """
    summaries, dataInfo =  gensimSummarizer()
    tokenizedSummaries = getSummarizedSents()
    summaryFile = '../../Data/test_data_arabic.dat'
    dataFile = '../../Data/test_dataset_info_arabic.dat'
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
    summaryFile = '../Summarization/Data/test_data_arabic.dat'
    dataFile = '../Summarization/Data/test_dataset_info_arabic.dat'
    with open(summaryFile, 'rb') as sumFile:
        summaries = pickle.load(sumFile, encoding='bytes')
    with open(dataFile, 'rb') as datFile:
        data = pickle.load(datFile, encoding='bytes')
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
print("The accuracy of summarizing after testing 1825 samples is : " , accuracy)
