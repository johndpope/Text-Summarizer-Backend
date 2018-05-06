import sys
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *

root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
happyRaw = filesList.raw(fileids = 'happy.txt')

wordProc = WordProcessor()
wordTokens = wordProc.processRawText(happyRaw)
print wordTokens
