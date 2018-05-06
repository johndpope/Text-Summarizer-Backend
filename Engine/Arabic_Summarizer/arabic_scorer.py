import sys
import time
import nltk
from pydash import at
from tokenizer import *
from features import *
from nltk.corpus import reuters



def gatherSentsInfo(corpusName, txtId, textTitle):
    """
    Computes all features for a given text and maps the collection of features to its sentences
    @params corpusName
    @params textId
    @params textTitle
    @rtype {Dictionary}
    """
    textRaw = corpusName.raw(fileids = txtId)
    sentProc = SentenceProcessor()
    wordProc = WordProcessor()
    proTool = ProcessingTools()
    textTitle = getDocTitle(textRaw)
    textRaw = removeTitleFromText(textRaw, textTitle)
    textSents = nltk.sent_tokenize(textRaw)
    sentTokens = []
    for sent in textSents:
        sentTokens.append(nltk.word_tokenize(sent))

    processedTokens = sentProc.processSentences(sentTokens)
    discourseTokens = proTool.discoursePreprocessing(sentTokens)
    mainConceptTokens = proTool.mainConceptPreprocessing(sentTokens)
    properNounsTokens = proTool.normalizeFirstWord(sentTokens)

    #TODO: check the employement of keyword similarity
    sentsLength = textSentencesLength(textSents)
    sentsPosition = weightSentencePosition(textSents)
    titleSimilarity = measureTitleSimilarity(textTitle, sentTokens)
    sentCohesion = sentToSentCohesion(sentTokens)
    centroidCohesion = sentToCentroidCohesion(sentTokens)
    termFrequency = meanTermFreq(sentTokens)

    sentsInfo = []
    for i, sentence in enumerate(textSents):
        sentsInfo.append({
                'sentence': textSents[i],
                'features': {
                        'length': sentsLength[i],
                        'position': sentsPosition[i],
                        'titleSim': titleSimilarity[i],
                        'sentCoh': sentCohesion[i],
                        'centroid': centroidCohesion[i],
                        'discourse': discourseMeasure[i],
                        'concept': mainConcept[i],
                        'properN': properNouns[i],
                        'termFreq': termFrequency[i]
                    }
            })
    return sentsInfo

def computeSentsScore(sentsDict):
    """
    Sums up all features and assigns the result to a new field in the dictionary
    @params sentsDict: the sentences dictionary that stores all data about a sentence
    @rtype {Dictionary}
    """
    #TODO: the method still requires validation
    featuresSum = 0.0
    for entry in sentsDict:
        featuresSum += entry['features']['length']
        + entry['features']['position']
        + entry['features']['titleSim']
        + entry['features']['sentCoh']
        + entry['features']['centroid']
        + entry['features']['termFreq']
        entry['score'] = featuresSum
        featuresSum = 0.0
    return sentsDict

def getArticlesScore():
    """
    Applying the scoring method on a collection of 100 reuters articles
    @rtype {Dictionary}
    """
    documents = prepareArticles()
    documentsData = []
    for i, document in enumerate(documents):
        print "------ gathering info for article # ", i, "------"
        docInfo = {}
        docFeatures = gatherSentsInfo(reuters, document[0], document[1])
        docScore = computeSentsScore(docFeatures)
        docInfo['title'] = document[1]
        docInfo['info'] = docScore
        docInfo['raw'] = document[2]
        documentsData.append(docInfo)
    return documentsData
