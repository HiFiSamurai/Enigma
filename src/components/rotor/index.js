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
    this.querySelector(`[slider=${slider.name}]`).textContent = slider.value;
    this.updateGear();
  }

  updateGear() {
    this.style.setProperty('--start', `${this.sliderScale('start') * 270}deg`);
    this.style.setProperty('--ratio', this.sliderScale('ratio'));
  }

  sliderScale(name) {
    const slider = this.querySelector(`.js-slider[name=${name}]`);
    return (slider.value - slider.min) / (slider.max - slider.min);
  }
}

export default Rotor.wrapped();
