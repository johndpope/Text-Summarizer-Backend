# -*- coding: utf-8 -*-
import time
import nltk
import sys
import json
import warnings
from tokenizer import *
from features import *
from trainer import *

def read_in():
    title = sys.argv[1]
    text = sys.argv[2]
    return title, text

def summarizeText(title, text):
    start_time = time.time()
    textRaw = text
    textSents = nltk.sent_tokenize(textRaw)
    sentTokens = []
    for sent in textSents:
        sentTokens.append(nltk.word_tokenize(sent))

    sentProc = SentenceProcessor()
    wordProc = WordProcessor()
    proTool = ProcessingTools()
    processedTokens = sentProc.processSentences(sentTokens)
    discourseTokens = proTool.discoursePreprocessing(sentTokens)
    mainConceptTokens = proTool.mainConceptPreprocessing(sentTokens)
    properNounsTokens = proTool.normalizeFirstWord(sentTokens)

    sentsLength = textSentencesLength(textSents)
    sentsPosition = weightSentencePosition(textSents)
    titleSimilarity = measureTitleSimilarity(title, sentTokens)
    sentCohesion = sentToSentCohesion(sentTokens)
    centroidCohesion = sentToCentroidCohesion(sentTokens)
    discourseMeasure = discourseIndex(discourseTokens)
    mainConcept = mainConceptIndicator(mainConceptTokens)
    properNouns = properNounsIndicator(properNounsTokens)
    termFrequency = meanTermFreq(sentTokens)

    sentsInfo = []
    for i, sentence in enumerate(textSents):
        sentsInfo.append({
                'sentence': textSents[i],
                'features': {
                        b'length': sentsLength[i],
                        b'position': sentsPosition[i],
                        b'titleSim': titleSimilarity[i],
                        b'sentCoh': sentCohesion[i],
                        b'centroid': centroidCohesion[i],
                        b'discourse': discourseMeasure[i],
                        b'concept': mainConcept[i],
                        b'properN': properNouns[i],
                        b'termFreq': termFrequency[i]
                    }
            })

    trainer = classifyData()
    classification = []
    for feature in sentsInfo:
        classification.append(trainer.classify(feature['features']))
    summary = []
    for i, sent in enumerate(sentsInfo):
        if classification[i]:
            summary.append(sent['sentence'])

    sumLen = 0;
    for sent in summary:
        sumLen += len(sent)
    print ('--------------------------------------------------------------------------')
    print ('original text length: ', len(text), '\nsummarized text length', sumLen)
    print ('-------------------------------------------------------------------------')
    print("---execution time: %s seconds ---" % (time.time() - start_time))
    print ('--------------------------------------------------------------------------')
    return ''.join(summary)

def main():
    warnings.filterwarnings("ignore")
    title, text = read_in();
    result = summarizeText(title, text)
    print (result)

if __name__ == '__main__':
    main()
