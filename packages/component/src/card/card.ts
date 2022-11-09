export class Card extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: var(--color-white);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow);
          max-width: 320px;
          overflow: hidden;
        }
        
        ::slotted(*) {
          padding-left: var(--padding-lg);
          padding-right: var(--padding-lg);
        }
        
        ::slotted(:last-child) {
          padding-bottom: var(--margin-lg);
        }
        
        ::slotted(img) {
          display: block;
          width: 100%;
          padding-left: 0;
          padding-right: 0;
        }
      
        ::slotted(a:link), ::slotted(a:visited) {
          display: block;
        }
      </style>

      <header>
        <slot name='header'></slot>
      </header>  
      
      <section>
        <slot name='content'></slot>
      </section>
      
      <footer>
        <slot name='footer'></slot>
      </footer>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('in-card', Card);