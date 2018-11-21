import {View, memoize} from '@HiFiSamurai/ui-toolkit';
import Enigma from './machine/Enigma';
import RotorComponent from './components/Rotor';
import Rotor from './machine/Rotor';
import Patch from './machine/Patch';

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

    this.addEventListener('keyup', ({keyCode}) => {
      if (keyCode === KEYCODES.ENTER) {
        this.trigger.click();
      }
    });

    this.input.addEventListener('keyup', ({target}) => {
      this.trigger.toggleAttribute('disabled', target.value.length === 0);
    });

    this.trigger.addEventListener('click', () => {
      const {mode, input} = this.settings;
      this.querySelector('.js-output').textContent = this.machine[mode](input);
    });
  }

  @memoize
  get machine() {
    return new Enigma({
      rotors: [
        new Rotor({ ratio: 2.25, start: 3 }),
        new Rotor({ ratio: 3.1, start: 1 }),
        new Rotor({ ratio: 4.737, start: 4 }),
      ],
      patches: [
        new Patch({ entry: 'a', exit: 'f' }),
        new Patch({ entry: 'j', exit: 'd' }),
        new Patch({ entry: 'g', exit: 's' }),
        new Patch({ entry: 'w', exit: 'q' }),
      ],
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
}

App.wrapped();
