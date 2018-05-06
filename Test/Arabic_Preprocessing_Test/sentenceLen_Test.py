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
sentsLength = textSentencesLength(textSents)

for i, sent in enumerate(textSents):
    print sent, sentsLength[i], '\n\n'

print sentsLength
