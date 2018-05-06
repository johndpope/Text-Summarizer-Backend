import nltk
import pickle
from tokenizer import *
from features import *
from scorer import *
from predicter import *
from gensim.summarization.summarizer import summarize



def getTrainingData():
    """
    Gets the prepared data for summarizing and training
    @rtype {Dictionary}
    """
    documents = getArticlesScore()
    trainingData = documents[:len(documents)/2]
    return trainingData

def gensimSummarizer():
    """
    Summarizes the dataset and adds the summary to each articles' Dictionary
    @rtype {List}: list of summaries, each one is presented by a string
    @rtype {Dictionary}
    """
    trainingData = getTrainingData()
    summaries = []
    docs = []
    for i, doc in enumerate(trainingData):
        text = doc['raw']
        summary = summarize(text, ratio=0.5)
        summaries.append(summary)
        doc['summary'] = summary
        fileName = '../rouge/reference/news'+str(i)+'_reference1'
        summaryTxt = open(fileName, 'wb');
        summaryTxt.write(summary);
        summaryTxt.close();
    return summaries, trainingData

def getSummarizedSents():
    """
    Tokenizes all datasets' summaries (sentence based tokenization)
    @rtype {List}: list(summary) of lists(sentences)
    """
    summaries, docs = gensimSummarizer()
    tokenizedSummaries = []
    for i, summary in enumerate(summaries):
        tokenizedSum = nltk.sent_tokenize(summary)
        tokenizedSummaries.append(tokenizedSum)
    return tokenizedSummaries

def saveTrainingData():
    """
    Serializes summaries, and training data and stores them
    """
    summaries, dataInfo =  gensimSummarizer()
    tokenizedSummaries = getSummarizedSents()
    summaryFile = '../Data/training_data.dat'
    dataFile = '../Data/dataset_info.dat'
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
    summaryFile = '../Data/training_data.dat'
    dataFile = '../Data/dataset_info.dat'
    openedSumFile = open(summaryFile, 'r')
    openedDataFile = open(dataFile, 'r')
    summaries = pickle.load(openedSumFile)
    data = pickle.load(openedDataFile)
    return summaries, data

def tagSentences(summaries, data):
    """
    Assigns True/False value for each sentence depending on whether it exists in summary or not
    @params {List}: list of tokenized summaries
    @params {Dictionary}: all info about every sentence in documents
    @rtype {List}: list(documents) of lists(sentences) with True/False values
    """
    tokenizedRaws = []
    taggedRaws = []
    taggedSent = []
    taggedSents = []
    for doc in data:
        tokenizedRaws.append(nltk.sent_tokenize(doc['raw']))
    for i, tokenizedDoc in enumerate(tokenizedRaws):
        for sent in tokenizedDoc:
            tag = sent in summaries[i]
            taggedSent.append(tag)
        taggedSents.append(taggedSent)
        taggedSent = []
    return taggedSents

def getDocFeatures(data):
    """
    Extracts sentences' features from data dictionary
    @params {Dictionary}: all info about every sentence in documents
    @rtype {List}: list(documents) of lists(sentences) with feature objects
    """
    allDocsFeatures = []
    docFeatures = []
    for doc in data:
        for sent in doc['info']:
            features = sent['features']
            features['score'] = sent['score']
            docFeatures.append(features)
        allDocsFeatures.append(docFeatures)
        docFeatures = []
    return allDocsFeatures


def matchTagsWithFeatures(tags, data):
    """
    Matches every list of features with True/False value, depending on whether the sentence exists in summaries or not
    @params {List}: list(documents) of lists(sentences) with True/False values
    @params {List}: @rtype {List}: list(documents) of lists(sentences) with feature objects
    @rtype {List}: list of all sentences' features and their tag regradeless to what document it belongs to
    """
    features = getDocFeatures(data)
    matchings = []
    for i, doc in enumerate(features):
        for j, sent in enumerate(doc):
            match = (sent, tags[i][j])
            matchings.append(match)
    return matchings

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
