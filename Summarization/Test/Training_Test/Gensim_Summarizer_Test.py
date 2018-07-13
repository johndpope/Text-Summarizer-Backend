import sys
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *
from features import *
from gensim.summarization.summarizer import summarize

root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
happyRaw = filesList.raw(fileids = 'happy.txt')
print(summarize(happyRaw, ratio = 0.3))
