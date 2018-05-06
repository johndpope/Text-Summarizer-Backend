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
txt = []
for sent in punc:
    txt.append(" ".join(sent))
score = discourseIndex(txt)
print len(score)
goodScore = [sent for sent in txt if score[txt.index(sent)]]
print score
print "Sentences that begin with a discourse marker"
print "------------------------------------------"
for score in goodScore:
    print score, "\n"
