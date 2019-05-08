// @flow
import { View } from '@HiFiSamurai/ui-toolkit';

import html from './rotor.html';
import './rotor.scss';

class Rotor extends View {
  static tag = 'enigma-rotor';
  static html = html;

  connectedCallback() {
    Array.from(this.querySelectorAll('.js-slider')).forEach(
      (slider: HTMLInputElement) => {
        slider.value = this.rotor[slider.name];
        this.updateLabel(slider);

        slider.addEventListener(
          'change',
          ({ target }: { target: HTMLInputElement }) => {
            this.rotor[target.name] = Number(target.value);
            this.updateLabel(target);
          }
        );
      }
    );
  }

  updateLabel(slider: HTMLInputElement) {
    this.querySelector(`[slider=${slider.name}]`).textContent = slider.value;
    this.updateGear();
  }

  updateGear() {
    this.style.setProperty('--start', `${this.sliderScale('start') * 270}deg`);
    this.style.setProperty(
      '--ratio',
      Math.sqrt(this.sliderScale('ratio') * 0.9 + 0.1)
    );
  }

  sliderScale(name: string): number {
    const slider = this.querySelector(`.js-slider[name=${name}]`);
    return (slider.value - slider.min) / (slider.max - slider.min);
  }
}

export default Rotor.wrapped();
