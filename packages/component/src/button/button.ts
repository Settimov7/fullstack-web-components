export class ButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('in-button');
  }
}

customElements.define('in-button', ButtonComponent, { extends: 'button' });
