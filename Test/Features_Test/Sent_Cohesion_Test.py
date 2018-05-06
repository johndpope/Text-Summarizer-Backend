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
cohesion = sentToSentCohesion(sentProc.processSentences(happySent))
tokenized = sentProc.processSentences(happySent)
sent = sentProc.processSentences(happySent)

sort = sorted(cohesion)
print "The cohesion values"
print cohesion
print "The sentence with the second lowest cohesion is: ", tokenized[cohesion.index(sort[0])]
