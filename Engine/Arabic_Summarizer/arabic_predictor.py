# -*- coding: utf-8 -*-
import time
import nltk
import sys
sys.path.append('../')
import json
import warnings
from tokenizer import *
from features import *
from arabic_trainer import *

def read_in():
    inputValues = sys.stdin.readlines()
    return inputValues[0], ''.join(inputValues[1:])

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
                        'length': sentsLength[i],
                        'position': sentsPosition[i],
                        'titleSim': titleSimilarity[i],
                        'sentCoh': sentCohesion[i],
                        'centroid': centroidCohesion[i],
                        'discourse': discourseMeasure[i],
                        'concept': mainConcept[i],
                        'properN': properNouns[i],
                        'termFreq': termFrequency[i]
                    },
                'score': sentsLength[i]
                    + sentsPosition[i]
                    + titleSimilarity[i]
                    + sentCohesion[i]
                    + centroidCohesion[i]
                    + discourseMeasure[i]
                    + mainConcept[i]
                    + properNouns[i]
                    + termFrequency[i]
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

    print ''.join(summary)
    print '--------------------------------------------------------------------------'
    print 'original text length: ', len(text), '\nsummarized text length', sumLen
    #print '-------------------------------------------------------------------------'
    print("---execution time: %s seconds ---" % (time.time() - start_time))
    print '--------------------------------------------------------------------------'
    #return ''.join(summary)

def main():
    warnings.filterwarnings("ignore")
    title = "العلماء يكتشفون مجرة ليس فيها مادة مظلمة تقريبًا. فماذا يعني ذلك؟"
    text = """توجد على بعد نحو 65 مليون سنة ضوئية من الأرض مجرة حيرت العلماء، واسمها دي إف 2. وقد تغير هذا المجرة فهمنا للمادة المظلمة والكون. فما الذي يميز هذه المجرة؟ تبدو هذه المجرة وكأنها لا تتضمن أي مادة مظلمة.

لم ير العلماء المادة المظلمة مباشرة، لكنهم يظنون أنها موجودة بسبب تأثيرها على المادة العادية أو الباريونية. واستنادًا إلى هذه الملاحظات غير المباشرة، قدر الباحثون أن المادة المظلمة تشكل نحو 27% من كوننا.

ومنذ «اكتشاف» المادة المظلمة، افترض الباحثون أنها ضرورية لتكوين المجرات؛ إذ تتكتل المادة المظلمة، وتجذب جاذبية هذه الكتل المادة العادية لتشكل النجوم والكواكب والأجرام الأخرى التي نستطيع رؤيتها في المجرة.

وبناءً على هذا الفهم، ظن الباحثون الذين كانوا يدرسون مجرة دي إف 2 أنهم يعرفون حقًا كمية المادة المظلمة فيها. لكن عند حساب المقدار الفعلي للمادة المظلمة في المجرة، اكتشفوا أن فيها 1/400 فحسب من مقدار المادة الظلمة الذي توقعوه.

وقال بيتر فان دوكوم، الأستاذ في جامعة ييل والمؤلف الرئيس لورقة عن دي إف 2 نشرت في مجلة نيتشر، في بيان صحافي «إنها تتحدى مفاهيمنا القياسية عن المجرات. وتشير هذه النتيجة أيضًا إلى احتمال وجود أكثر من طريقة لتشكل المجرات.»
ودي إف 2 مجرة فريدة من نواحي أخرى أيضًا، ولا تطابق خصائص المجرة الحلزونية، والتي تحوي عادةً مراكز كثيفة وأذرعًا لولبية وقرصًا. لكنها أيضًا لا تشبه المجرات الإهليليجية المعروفة، والتي يوجد في مركزها ثقب أسود. ويبدو أن دي إف 2 نوع نادر من المجرات المنتشرة الهائلة. وقال فان دوكوم «إنها متناثرة جدًا لدرجة أنك تستطيع رؤية المجرات خلفها، فهي مجرة شفافة تقريبًا.» وقد يبدو هذا مفاجئًا، لكن دي إف 2 تدعم فكرة وجود المادة المظلمة، والتي تقول بعض النظريات أنها غير موجودة.

وقالت جوسلين مونرو، عالمة فيزياء الجسيمات وخبيرة المادة المظلمة في جامعة لندن، والتي لم تشارك في الدراسة، لموقع ذا فيرج «لا تتفق النظريات التقليدية مع وجود مجرة تبدو وكأنها لا تحوي مادة مظلمة. ولهذا تعد هذه المجرة مدهشة حقًا لأنها قد تستبعد بعض هذه الأفكار.» ويأمل الباحثون في تحديد عمر المجرة. وقال فان دوكوم لمحطة إيه بي سي «كل ما نعرفه حتى اليوم أن عمرها أكثر من 10 مليارات عام، ولكننا نريد معرفة إن كان عمرها 10 مليارات أو 13 مليار عام، أي هل تشكلت في بداية الكون.»

وإن تبين أن عمر المجرة 13 مليار عام، فستكون أقدم مجرة مكتشفة على الإطلاق."""
    summarizeText(unicode(title, 'utf-8'), unicode(text, 'utf-8'))
    #title, text = read_in();
    #result = summarizeText(title, text)
    #print result

if __name__ == '__main__':
    main()
