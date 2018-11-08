import '@webcomponents/webcomponentsjs';

class View extends HTMLElement {
  static wrapped() {
    customElements.define(this.tag, this);
    return (params) => Object.assign(new this(), params);
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode((this.constructor.styles || '').toString()));
    this.shadowRoot.appendChild(style);

    const slots = new DOMParser().parseFromString(this.constructor.slots || '', 'text/html').body;
    Array.from(slots.children).forEach((child) => { this.appendChild(child); });

    const shadow = new DOMParser().parseFromString(this.constructor.shadow || '', 'text/html').body;
    Array.from(shadow.children).forEach((child) => { this.shadowRoot.appendChild(child); });
  }

  set slots(map) {
    Object.entries(map).map(([key, value]) => {
      this.querySelector(`[slot=${key}]`).textContent = value;
    });
  }
}

export default View;
