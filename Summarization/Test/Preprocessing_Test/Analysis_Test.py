from __future__ import print_function
import sys
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *

root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
analyzer.count(filesList, 'happy.txt')
analyzer.countSpecificWords(filesList, 'happy.txt', ['world', 'life', 'how'])
analyzer.tabulateWordsInAllGeners(['good', 'bad', 'happy', 'sad'])
analyzer.tabulateWordsInPeriods(['citizen', 'home', 'fight'])
analyzer.generateText(filesList.words(fileids = 'happy.txt'), 'learn')
analyzer.lexDiversity(filesList.words(fileids = 'happy.txt'))
unusual = analyzer.unusualWords(filesList.words(fileids = 'happy.txt'))
print(unusual)
