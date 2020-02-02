# coding=utf-8
print('时尚大方')

if True:
  print'add', 'same line'
else:
  print('adsfsfdfg')

# raw_input("按下 enter 键退出，其他任意键显示...\n")

'''
注释
'''

total = 1 +\
2 + \
3
print(total)

str = 'abcde'
print str[-2], str[1:4], str[1:], str * 2

list = [1,2,3,4]
print list[:], list * 2, list + [5,6]

dict = { 'a': 1, "b": 2 }
print dict.keys(), dict.values(), 11 //2

print 1 in list, 2 not in list, 'a' in dict

print list == [1,2,3,4], list is [1,2,3,4]

print "My name is %s and weight is %d kg!" % ('Zara', 21) 


import math
print dir(math)