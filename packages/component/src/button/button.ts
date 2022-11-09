const buttonStyles = `
  .in-button.primary {
    box-sizing: border-box;
    min-width: 180px;
    min-height: 44px;
    padding: 0px;
    border: 2px solid var(--color-blue-500);
    border-radius: 12px;
    
    font-size: var(--font-body-md);
    font-weight: var(--font-weight-button);
    color: var(--color-white);
    
    background-color: var(--color-blue-500);
    cursor: pointer;
  }
  
  .in-button.secondary {
    box-sizing: border-box;
    min-width: 180px;
    min-height: 44px;
    padding: 0px;
    border: 2px solid var(--color-blue-500);
    border-radius: 12px;
    
    font-size: var(--font-body-md);
    font-weight: var(--font-weight-button);
    color: var(--color-blue-500);
    
    background-color: var(--color-white);
    cursor: pointer;
  }
  
  .in-button.icon {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: var(--padding-xs);
    border: 2px solid var(--color-blue-500);
    border-radius: 12px;
    
    font-size: var(--font-body-icon);
    font-weight: var(--font-weight-button);
    color: var(--color-blue-500);
    
    background-color: var(--color-white);
    cursor: pointer;
  }
  
  .icon svg {
    width: 100%;
    height: 100%;
  }
  
  .icon.icon-close svg {
    transform: rotateZ(45deg);
  }
  
  .in-button:focus {
    border: 2px solid var(--color-black);
    outline: none;
  
    color: var(--color-black);
  
    background-color: var(--color-white);
  }
  
  .in-button:active {
    border: 2px solid var(--color-neutral-500);
    outline: none;
  
    color: var(--color-neutral-500);
    
    background-color: var(--color-white);
  }
  
  .in-button[disabled] {
    opacity: var(---color-disable);
    background: var(--color-disable);
    border: var(--border-disable);
    color: var(--color-neutral-500);
    cursor: default;
  }
  
  .in-button[disabled]:focus,
  .in-button[disabled]:active {
    border: var(--border-disable);
    outline: none;
    box-shadow: none;
  }
`;

export class ButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
  }

  addStylesheet() {
    const head = document.head;

    if (document.getElementById('in-button-style')) {
      return;
    }

    const style = document.createElement('style');

    style.setAttribute('id', `in-button-style`);
    style.textContent = buttonStyles;
    head.appendChild(style);
  }

  connectedCallback() {
    this.classList.add('in-button');
    this.addStylesheet();
  }
}

customElements.define('in-button', ButtonComponent, { extends: 'button' });
