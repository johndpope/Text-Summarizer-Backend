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
txtTitle = 'The Importance of Getting Distracted'
similarity = measureTitleSimilarity(txtTitle, sentProc.processSentences(happySent))
print similarity
