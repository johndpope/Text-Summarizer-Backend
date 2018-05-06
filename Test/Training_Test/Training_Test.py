import sys
import time
import nltk
sys.path.append('../../Engine')
from trainer import *
from scorer import *
from test import *

root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
happySent = filesList.raw(fileids = 'happy.txt')

classifier = classifyData()
