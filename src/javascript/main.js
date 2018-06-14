import Enigma from './Enigma';

const enigma = new Enigma();

document.querySelector('#submitTrigger').addEventListener('click', () => {
  const inputText = document.querySelector('#inputText').value;
  const mode = document.querySelector('input[type=radio][name=type]:checked').value;
  const outputText = enigma[mode](inputText);
  document.querySelector('#outputText').innerHTML = outputText;
});
