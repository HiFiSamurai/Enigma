import {memoize} from '@HiFiSamurai/ui-toolkit';
import Enigma from './machine/Enigma';
import './app.scss';

class App extends HTMLElement {
  connectedCallback() {
    this.querySelector('#submitTrigger').addEventListener('click', () => {
      const settings = this.settings;
      this.querySelector('#output').textContent = this.machine[settings.mode](settings.input);
    });
  }

  @memoize
  get machine() {
    return new Enigma();
  }

  get settings() {
    return {
      input: this.querySelector('#input').value,
      mode: this.querySelector('#mode').checked ? 'decode' : 'encode',
    };
  }
}

customElements.define('enigma-app', App);
