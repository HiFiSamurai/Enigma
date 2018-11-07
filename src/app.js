import View from './test/View';
import html from './app.html';
import styles from './app.scss';

import Enigma from './machine/Enigma';

const enigma = new Enigma();

class App extends View {
  static tag = 'enigma-app';
  static html = html;
  static styles = styles.toString();

  connectedCallback() {
    this.querySelector('#submitTrigger').addEventListener('click', () => {
      const inputText = this.querySelector('#inputText').value;
      const mode = this.querySelector('#machineMode').checked ? 'decode' : 'encode';
      const outputText = enigma[mode](inputText);
      this.querySelector('#outputText').innerHTML = outputText;
    });
  }
};

App.wrapped();
