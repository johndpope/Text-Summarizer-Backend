import sys
import time
sys.path.append('../../Engine')
from scorer import *

root = '../../Test'
analyzer = Analyzer()
filesList = analyzer.createCorpus(root)
#sentsInfo = gatherSentsInfo(filesList, 'happy.txt', 'The Importance of Getting Distracted')

#sentsInfo = gatherSentsInfo(filesList, 'football.txt', 'Guardiola ready to play weakened team against Man Utd')
sentsInfo = gatherSentsInfo(filesList, 'nokia.txt', 'Please, Nokia, bring back the 7110 next')
# sentsInfo = gatherSentsInfo(filesList, 'football podcast.txt', "VAR worries, World Cup dreams and West Ham's woe - Football Weekly Extra")

#score = computeSentsScore(sentsInfo)


#for info in score:
#    print 'SENTENCE: ', info['sentence'][:50],'...'
#    print 'FEATURES: ', info['features']
#    print 'SCORE: ', info['score']
#    print "\n\n"

print "-------------------------------------------"
start_time = time.time()
docs = getArticlesScore()
for doc in docs:
    print 'TITLE:', doc['title']
    print '---------------------\n'
    for info in doc['info']:
        print 'SENTENCE: ', info['sentence']
        print 'FEATURES: ', info['features']
        print 'SCORE: ', info['score']
        print "\n"
    print "======================================="
print("---execution time: %s seconds ---" % (time.time() - start_time))
