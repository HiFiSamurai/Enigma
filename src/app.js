import {View, memoize} from '@HiFiSamurai/ui-toolkit';
import Enigma from 'src/machine/Enigma';
import RotorComponent from 'src/components/Rotor';
import Rotor from 'src/machine/Rotor';

import html from './app.html';
import './app.scss';
import './icons';

const KEYCODES = {
  ENTER: 13,
};

class App extends View {
  static tag = 'enigma-app';
  static html = html;

  connectedCallback() {
    this.querySelector('.js-rotors').appendChild(
      this.machine.rotors.reduce((frag, rotor) => {
        frag.appendChild(new RotorComponent({ rotor }));
        return frag;
      }, document.createDocumentFragment())
    );

    this.querySelector('.js-rotors').addEventListener('change', () => {
      this.hash = this.machine.settings;
    });

    this.addEventListener('keyup', ({keyCode}) => {
      this.trigger.toggleAttribute('disabled', this.input.value.length === 0);

      if (keyCode === KEYCODES.ENTER) {
        this.trigger.click();
      }
    });

    this.trigger.addEventListener('click', () => {
      const {mode, input} = this.settings;
      this.querySelector('.js-output').textContent = this.machine[mode](input);
    });
  }

  @memoize
  get machine() {
    return new Enigma({
      rotors: this.hash.rotors.map((settings) => new Rotor(settings)),
    });
  }

  get settings() {
    return {
      input: this.input.value,
      mode: this.querySelector('.js-mode').checked ? 'decode' : 'encode',
    };
  }

  get input() {
    return this.querySelector('.js-input');
  }

  get trigger() {
    return this.querySelector('.js-submit');
  }

  get hash() {
    try {
      return JSON.parse(atob(window.location.hash.replace(/^#/, '')));
    } catch { // Return default settings when empty/invalid hash supplied
      return {
        rotors: [
          { ratio: 2.25, start: 3 },
          { ratio: 3.1, start: 1 },
          { ratio: 4.737, start: 4 },
        ],
      };
    }
  }

  set hash(settings) {
    window.location.hash = `#${btoa(JSON.stringify(settings))}`;
  }
}

App.wrapped();
