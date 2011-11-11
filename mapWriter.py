from random import randint

if __name__ == '__main__':
	mapSize = 126
	filename = "map.py"
	f = file(filename,'w')
	keys = []
	chars = []

	while len(keys) < mapSize-31:
		x = randint(32,mapSize)
		if (not x in keys):
			keys.append(x)
			chars.append(unichr(x))

	print >> f, "charMap = " + str(chars)
	print >> f, "gears = [2.25, 1.125, 3.1, 4.2]"

	print "Wrote Character map: " + str(len(chars))
