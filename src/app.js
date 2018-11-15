import {View, memoize} from '@HiFiSamurai/ui-toolkit';
import Enigma from './machine/Enigma';
import html from './app.html';
import './app.scss';

class App extends View {
  static tag = 'enigma-app';
  static html = html;

  connectedCallback() {
    this.querySelector('.js-submit').addEventListener('click', () => {
      const settings = this.settings;
      this.querySelector('.js-output').textContent = this.machine[settings.mode](settings.input);
    });
  }

  @memoize
  get machine() {
    return new Enigma();
  }

  get settings() {
    return {
      input: this.querySelector('.js-input').value,
      mode: this.querySelector('.js-mode').checked ? 'decode' : 'encode',
    };
  }
}

App.wrapped();
