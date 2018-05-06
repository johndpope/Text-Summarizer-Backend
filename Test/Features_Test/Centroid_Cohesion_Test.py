import sys
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *
from features import *


root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
happySent = filesList.sents(fileids = 'happy.txt')
sentProc = SentenceProcessor()
sent = sentProc.processSentences(happySent)
cohesion = sentToCentroidCohesion(sent)
print "Cohesion Values"
print cohesion
counter = 0 ;
goodCohesion = []
for score in cohesion:
    if score != 0.0:
        goodCohesion.append(sent[counter])
    counter+=1
print "Sentences with cohesion higher that 0.0"
print "---------------------------------------"
print goodCohesion
