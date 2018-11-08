import View from './test/View';
import shadow from './views/app.html';
import slots from './views/slots.html';
import styles from './app.scss';

import Enigma from './machine/Enigma';

const enigma = new Enigma();

class App extends View {
  static tag = 'enigma-app';
  static shadow = shadow;
  static styles = styles;
  static slots = slots;

  connectedCallback() {
    this.shadowRoot.querySelector('#submitTrigger').addEventListener('click', () => {
      const settings = this.settings;
      this.slots = {
        'output-text': enigma[settings.mode](settings.input),
      };
    });
  }

  get settings() {
    return {
      input: this.shadowRoot.querySelector('#inputText').value,
      mode: this.shadowRoot.querySelector('#machineMode').checked ? 'decode' : 'encode',
    };
  }
}

App.wrapped();
