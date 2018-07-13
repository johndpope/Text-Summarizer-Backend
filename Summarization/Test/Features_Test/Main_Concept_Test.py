import sys
import re
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *
from features import *


root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
pro = SentenceProcessor()
happySent = filesList.sents(fileids = 'happy.txt')
fold = pro.caseFoldingSent(happySent)
uni = pro.removeUnicodeSent(fold)
punc = pro.removePuncSent(uni)
score = mainConceptIndicator(punc)
print (score)
