import sys
from rotor import *
from map import *

#enigma
#params:
#@message: message to encode or decode
#@ringstellung[]: starting position for each rotor (use 0 index or 1?)
#@steckerverbindungen[]: 
class enigma(object):
    rotors = []
    def __init__(self, message, ringstellung = []):
        self.message = message
        x = 0
        for x in range(len(ringstellung)):
            r = rotor(ringstellung[x])
            self.rotors.append(r)
            x+=x

    def encrypt(msg):
        eMsg = msg
        e = enigma("hell", [9,0,20])
        return eMsg
        
    def decrypt():
        dMsg = msg
        return dMsg
        
#move this to a main.py
if __name__ == '__main__':
    if len(sys.argv) < 3 :
        sample()
        sys.exit()

    msg = sys.argv[2]

    if (sys.argv[1] == 'e'):
        eMsg = enigma.encrypt(msg)
    elif (sys.argv[1] == 'd'):
        eMsg = enigma.decrypt(msg)
    print(eMsg)