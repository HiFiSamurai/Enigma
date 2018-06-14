class rotor(object):

    charMap = [u'a', u'b', u'c', u'd', u'e', 
    u'f', u'g', u'h', u'i', u'j', 
    u'k', u'l', u'm', u'n', u'o', 
    u'p', u'q', u'r', u's', u't', 
    u'u', u'v', u'w', u'x', u'y', u'z']

    def __init__(self,startPOS):
        self.startPOS = startPOS
        
    def getStartPos(self):
        return self.charMap[self.startPOS]#[self.startPOS+1] if a=1