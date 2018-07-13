# -*- coding: utf-8 -*-
import sys
sys.path.append('../../Engine/Arabic_Summarizer')
from analyzer import *
from tokenizer import *
from features import *


root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
text = filesList.raw(fileids = 'passwords.txt').encode('utf-8')
textRaw = text.decode('utf-8')
textSents = nltk.sent_tokenize(textRaw)
sentTokens = []
for sent in textSents:
    sentTokens.append(nltk.word_tokenize(sent))

termFreq = meanTermFreq(sentTokens)

print termFreq
