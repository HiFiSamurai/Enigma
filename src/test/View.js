import '@webcomponents/webcomponentsjs';

class View extends HTMLElement {
  static wrapped() {
    customElements.define(this.tag, this);
    return (params) => Object.assign(new this(), params);
  }

  constructor() {
    super();

    if (!this.constructor.html) { return; }

    const template = new DOMParser().parseFromString(this.constructor.html, 'text/html');
    const content = document.importNode(template.head.firstChild.content, true);
    this.attachShadow({ mode: 'open' });

    if (this.constructor.styles) {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(this.constructor.styles.toString()));
      this.shadowRoot.appendChild(style);
    }

    this.shadowRoot.appendChild(content);
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }
}

export default View;
