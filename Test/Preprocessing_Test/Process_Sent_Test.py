import sys
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *

root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
happySent = filesList.sents(fileids = 'happy.txt')

sentProc = SentenceProcessor()
sentTokens = sentProc.processSentences(happySent)
print sentTokens
