'''
Created on 2011-10-23

@author: maynard
'''
import sys
from map import *
from datetime import datetime

def encrypt(msg, dateKey):
	eMsg = ""
	i = 0
	for c in msg:
		x = ord(c)
		for j in range(len(gears)-1):
			x += int(gears[j]*i)
		i += 1
        	eMsg += charMap[(x + dateKey)% len(charMap)]

	return eMsg

def decrypt(msg, dateKey):
	dMsg = ""
	i = 0
	for c in msg:
		x = charMap.index(c)
		for j in range(len(gears)-1):
			x -= int(gears[j]*i)
		i += 1

		x -= dateKey
		while (x<32):
			x += len(charMap)

	       	dMsg += chr(x)

	return dMsg

def sample():
	ts = datetime.now()
	dateKey = ts.month + ts.day + (ts.year % 2000)

	msg = "Namu Amida Butsu"
	eMsg = encrypt(msg, dateKey)
	dMsg = decrypt(eMsg, dateKey)

	print "Message: " + msg
	print "Encrypted: " + eMsg
	print "Decrypted: " + dMsg

if __name__ == '__main__':
	if len(sys.argv) < 3 :
		sample()
		sys.exit()

	msg = sys.argv[2]

	ts = datetime.now()
	dateKey = ts.month + ts.day + (ts.year % 2000)

	if (sys.argv[1] == 'e'):
		eMsg = encrypt(msg, dateKey)
	elif (sys.argv[1] == 'd'):
		eMsg = decrypt(msg, dateKey)
	print eMsg
