import {View, memoize} from '@HiFiSamurai/ui-toolkit';
import Enigma from 'src/machine/Enigma';
import Rotor from 'src/machine/Rotor';
import RotorComponent from 'src/components/Rotor';

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
    const frag = document.createDocumentFragment();
    for (const rotor of this.machine.rotors) {
      frag.appendChild(new RotorComponent({ rotor }));
    }
    this.querySelector('.js-rotors').appendChild(frag);

    this.querySelector('.js-rotors').addEventListener('change', () => {
      this.hash = this.machine.settings;
    });

    this.input.addEventListener('keypress', (event) => {
      if (event.keyCode === KEYCODES.ENTER) {
        this.mode.click();
        event.preventDefault();
      }
    });

    this.mode.addEventListener('change', () => {
      const {mode, input} = this.settings;
      this.input.value = this.machine[mode](input);
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

  get mode() {
    return this.querySelector('.js-mode');
  }

  get hash() {
    try {
      const { r } = JSON.parse(atob(window.location.hash.replace(/^#/, '')));
      return {
        rotors: r.map(({ r, s }) => {
          return { ratio: r, start: s };
        }),
      };
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

  set hash({ rotors }) {
    const compressed = {
      r: rotors.map(({ratio, start}) => {
        return { r: ratio, s: start };
      }),
    };
    window.location.hash = `#${btoa(JSON.stringify(compressed))}`;
  }
}

App.wrapped();
