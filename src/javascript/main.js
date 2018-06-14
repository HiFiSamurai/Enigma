import Enigma from './Enigma';

const enigma = new Enigma();
window.enigma = enigma;

const testStr = 'Something';
console.log('Test String: ' + testStr);

const encoded = enigma.encode(testStr);
console.log('Encoded: ' + encoded);

const encoded2 = enigma.encode(testStr);
console.log('Re-Encoded: ' + encoded2);
