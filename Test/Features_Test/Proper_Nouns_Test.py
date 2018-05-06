import sys
import re
sys.path.append('../../Engine')
from analyzer import *
from tokenizer import *
from features import *


root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
happySent = filesList.sents(fileids = 'happy.txt')
proc = ProcessingTools()
text = proc.normalizeFirstWord(happySent)
score = properNounsIndicator(text)
print "Checking if each sentence contains at least one proper noun"
print "-----------------------------------------------------------"
print score
