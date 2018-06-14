import Enigma from './Enigma';

const enigma = new Enigma();
window.enigma = enigma;

const testStr = 'Something';
console.log('Test String: ' + testStr);

const encoded = enigma.encode(testStr);
console.log('Encoded: ' + encoded);

const decoded = enigma.decode(encoded);
console.log('Decoded: ' + decoded);
