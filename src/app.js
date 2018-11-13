import './app.scss';

import Enigma from './machine/Enigma';

const enigma = new Enigma();

class App extends HTMLElement {
  connectedCallback() {
    this.querySelector('#submitTrigger').addEventListener('click', () => {
      const settings = this.settings;
      this.querySelector('#output').textContent = enigma[settings.mode](settings.input);
    });
  }

  get settings() {
    return {
      input: this.querySelector('#input').value,
      mode: this.querySelector('#mode').checked ? 'decode' : 'encode',
    };
  }
}

customElements.define('enigma-app', App);
