
import sys
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *
from features import *


root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
happyRaw = filesList.raw(fileids = 'happy.txt')
happySent = filesList.sents(fileids = 'happy.txt')
sentProc = SentenceProcessor()
sentTokens = sentProc.processSentences(happySent)
termFreq = termFreqInverseSentFreq(sentTokens)
print sentTokens[0], '\n'
print termFreq[0]
