import sys
sys.path.append('../')
import nltk
import pickle
from tokenizer import *
from features import *
from arabic_scorer import *
from trainer import *
from gensim.summarization.summarizer import summarize



def saveTrainingData():
    """
    Serializes summaries, and training data and stores them
    """
    summaries, dataInfo =  gensimSummarizer()
    tokenizedSummaries = getSummarizedSents()
    summaryFile = '../../Data/training_data_arabic_features.dat'
    dataFile = '../../Data/dataset_info_arabic.dat'
    openedSumFile = open(summaryFile, 'wb')
    pickle.dump(tokenizedSummaries, openedSumFile)
    openedSumFile.close()
    openedDataFile = open(dataFile, 'wb')
    pickle.dump(dataInfo, openedDataFile)
    openedDataFile.close()

def loadTrainingData():
    """
    Loads summaries and training data info
    @rtype {List}: list of tokenized summaries
    @rtype {Dictionary}: all info about every sentence in documents
    """
    summaryFile = '../Summarization/Data/training_data_arabic_features.dat'
    dataFile = '../Summarization/Data/dataset_info_arabic.dat'
    with open(summaryFile, 'rb') as sumFile:
        summaries = pickle.load(sumFile, encoding='bytes')
    with open(dataFile, 'rb') as datFile:
        data = pickle.load(datFile, encoding='bytes')
    return summaries, data

def classifyData():
    """
    Classifies training data using naive bayes classifier
    @rtype {Classifier}
    """
    summaries, data = loadTrainingData()
    tags = tagSentences(summaries, data)
    tuples = matchTagsWithFeatures(tags, data)
    classifier = nltk.NaiveBayesClassifier.train(tuples)
    return classifier
