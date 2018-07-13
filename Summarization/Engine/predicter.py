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
    #title, text = read_in();
    title = "Guardiola ready to play weakened team against Man Utd"
    text = """﻿The Catalan has told some of his star players that he will leave them out of the Manchester derby in a bid to focus minds on games against Liverpool
Pep Guardiola has told his Manchester City players that he is willing to make significant changes for next Saturday's Manchester derby, despite the fact that they will be confirmed as Premier League Champions if they beat their rivals at the Etihad Stadium.

Guardiola is prioritising both legs of the Champions League quarter-finals against Liverpool and is ready to field a weakened team against United in a bid to keep his squad fresh.

The Catalan revealed following Saturday's victory at Goodison Park that all of his decisions over the next 10 days will be made with both games against Liverpool in mind.

And that is a message he pressed home during a meeting with his squad at City's training ground on Sunday morning, stressing to them that they need to be fully focused on the full 180 minutes against the Reds.

Sources close to Guardiola have told Goal that he is desperate to reach the Champions League semi-finals this season, and it is believed he told several specific first-team players that they will be rested against United if the European tie is in the balance after Wednesday's first leg.

Those sources have suggested that the Catalan's stance is only likely to change if City rack up a comfortable win at Anfield in midweek, but that is not something he has communicated to his players as he is so keen to keep their minds focused on Liverpool.

Speaking after the 3-1 win at Everton on Saturday, Guardiola explained his position and prepared supporters for his decisions.

"Of course I want to win against United at home but we have three days before we have Liverpool, after we have three days before United and after we have three days before the second leg so few recovery days.

"You have to use all the squad but that doesn't mean the guys who play are not going to prepare to win. If we are in the position we are now in the Premier League it is because everyone has made his own contribution. That is going to happen. But I am sorry, as a manager, now Liverpool will occupy all my head."

Guardiola had earlier insisted that City will have six further opportunities to seal the title if they do not manage to beat United on next Saturday.

Sources close to the Catalan have also pointed out that while beating Jose Mourinho's United is the ideal scenario, winning the title at Wembley against Tottenham on April 14 would also carry great personal significance, given he won the Champions League there as a Barcelona player in 1992 and as a coach in 2011."""
    result = summarizeText(title, text)
    print (result)

if __name__ == '__main__':
    main()
