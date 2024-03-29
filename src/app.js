// @flow
import { View, memoize } from '@HiFiSamurai/ui-toolkit';
import Enigma from './machine/Enigma';
import Rotor, { type RotorSettings } from './machine/Rotor';
import RotorComponent from './components/rotor';

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

    this.querySelector('.js-settings').addEventListener('change', () => {
      this.hash = this.machine.settings;
    });

    this.input.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.keyCode === KEYCODES.ENTER) {
        this.mode.click();
        event.preventDefault();
      }
    });

    this.input.addEventListener('keyup', () => {
      this.clear.toggleAttribute('disabled', this.input.value.length === 0);
    });

    this.clear.addEventListener('click', () => {
      this.input.value = '';
      this.clear.toggleAttribute('disabled', true);
    });

    this.mode.addEventListener('change', () => {
      const { mode, input } = this.settings;
      this.input.value = this.machine[mode](input);
    });
  }

  @memoize
  get machine(): Enigma {
    return new Enigma({
      rotors: this.hash.rotors.map(
        (settings: RotorSettings) => new Rotor(settings)
      ),
      patches: [],
    });
  }

  get settings(): { input: string, mode: 'decode' | 'encode' } {
    return {
      input: this.input.value,
      mode: this.querySelector('.js-mode').checked ? 'decode' : 'encode',
    };
  }

  get input(): HTMLInputElement {
    return this.querySelector('.js-input');
  }

  get mode(): HTMLInputElement {
    return this.querySelector('.js-mode');
  }

  get clear(): HTMLButtonElement {
    return this.querySelector('.js-clear');
  }

  get hash(): { rotors: RotorSettings[] } {
    try {
      const { r } = JSON.parse(atob(window.location.hash.replace(/^#/, '')));
      return {
        rotors: r.map(({ r, s }) => {
          return { ratio: r, start: s };
        }),
      };
    } catch {
      // Return default settings when empty/invalid hash supplied
      return {
        rotors: [
          { ratio: 2.25, start: 3 },
          { ratio: 3.1, start: 1 },
          { ratio: 4.737, start: 4 },
        ],
      };
    }
  }

  set hash({ rotors }: { rotors: RotorSettings[] }) {
    const compressed = {
      r: rotors.map(({ ratio, start }) => {
        return { r: ratio, s: start };
      }),
    };
    window.location.hash = `#${btoa(JSON.stringify(compressed))}`;
  }
}

App.wrapped();
