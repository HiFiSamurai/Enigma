import {View} from '@HiFiSamurai/ui-toolkit';

import html from './rotor.html';
import './rotor.scss';

class Rotor extends View {
  static tag = 'enigma-rotor';
  static html = html;

  connectedCallback() {
    Array.from(this.querySelectorAll('.js-slider')).forEach((slider) => {
      slider.value = this.rotor[slider.name];
      this.updateLabel(slider);

      slider.addEventListener('change', ({target}) => {
        this.rotor[target.name] = Number(target.value);
        this.updateLabel(target);
      });
    });
  }

  updateLabel(slider) {
    this.querySelector(`[label=${slider.name}]`).textContent = slider.value;
  }
}

export default Rotor.wrapped();
