import { IElementInternals as ElementInternals, ValidityStateFlags } from 'types/lib.elementInternals';
import { validate, Validator } from './validator';

export class TextInputComponent extends HTMLElement {
  private internals: ElementInternals;
  private $attr = {};

  public attachInternals: () => ElementInternals;
  public $validator: Validator;

  static formAssociated = true;

  static get observedAttributes() {
    return [
      'name',
      'type',
      'value',
      'required',
      'disabled',
      'minlength',
      'maxlength',
      'pattern',
      'list',
      'placeholder',
      'readonly',
      'spellcheck',
    ];
  }

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-default);
          font-size: var(--font-body-sm);
        }
        
        input {
          box-sizing: border-box;
          width: 100%;
          height: var(--input-min-dimension);
          padding-left: var(--padding-sm);
          border: var(--border-default);
          border-radius: var(--radius-sm);
          outline: none;
          
          font-size: var(--font-body-md);
        }
        
        input:hover,
        input:focus,
        input:active {
          border: var(--border-focus);
        }
        
        input.error {
          border: var(--border-error);
          
          color: var(--color-error);
        }
        
        .message {
          margin-top: var(--margin-xxs);
          
          color: var(--color-error);
        }
       
        input[disabled] {
          border: var(--border-disable);
 
          background-color: var(--color-disable);
        }
      </style>
  
      <div class='control'>
        <input type='text' />
      <div>
      
      <div class='message'></div>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));

    this.internals = this.attachInternals();
  }

  get validity() {
    return this.internals.validity;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  get $input(): HTMLInputElement {
    return this.shadowRoot.querySelector('input');
  }

  get value() {
    return this.$input.value;
  }

  set value(value: string) {
    this.$input.value = value;
  }

  get required(): boolean {
    return this.$input.required;
  }

  set required(value: boolean | string) {
    if (value === 'true' || value === true) {
      this.$input.setAttribute('required', 'true');
    }

    if (value === 'false' || value === false) {
      this.$input.removeAttribute('required');
    }
  }

  get disabled(): boolean {
    return this.$input.disabled;
  }

  set disabled(value: boolean | string) {
    if (value === 'true' || value === true) {
      this.$input.setAttribute('disabled', 'true');
    }

    if (value === 'false' || value === false) {
      this.$input.removeAttribute('disabled');
    }
  }

  get type(): string {
    return this.$input.type ?? 'text';
  }

  set type(type: string) {
    this.$input.setAttribute("type", type);
  }

  get list() {
    return this.$input.list;
  }

  get minLength(): number {
    return this.$input.minLength;
  }

  set minLength(min: number) {
    this.$input.minLength = min;
  }

  get maxLength(): number {
    return this.$input.maxLength;
  }

  set maxLength(max: number) {
    this.$input.maxLength = max;
  }

  get readOnly(): boolean {
    return this.$input.readOnly;
  }

  get pattern(): string {
    return this.$input.pattern;
  }

  set pattern(pattern: string) {
    this.$input.pattern = pattern;
  }

  get placeholder(): string {
    return this.$input.placeholder;
  }

  get spellcheck(): boolean {
    return this.$input.spellcheck;
  }

  connectedCallback() {
    this.$input.onblur = () => {
      this.onValidate(true);
    }

    this.$input.onchange = () => {
      this.onChange();
    }

    for (let prop in this.$attr) {
      this.$input.setAttribute(prop, this.$attr[prop]);
    }

    this.onValidate(false);
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  checkValidity(): boolean {
    return this.internals.checkValidity();
  }

  reportValidity(): boolean {
    return this.internals.reportValidity()
  }

  setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
    this.internals.setValidity(flags, message, anchor);
  }

  attributeChangedCallback(name: string, prev, next): void {
    this.$attr[name] = next;

    switch (name) {
      case "name": {
        this.$input.setAttribute('name', next);

        break;
      }

      case "type": {
        this.$input.setAttribute('type', next);

        break;
      }

      case "value": {
        this.value = next;

        break;
      }

      case "required": {
        this.required = next;

        break;
      }

      case "disabled": {
        this.disabled = next;

        break;
      }

      case "minlength": {
        this.$input.setAttribute('minlength', next);

        break;
      }

      case "maxlength": {
        this.$input.setAttribute('maxlength', next);

        break;
      }

      case "pattern": {
        this.$input.setAttribute('pattern', next);

        break;
      }

      case "list": {
        this.$input.setAttribute('list', next);

        break;
      }

      case "placeholder": {
        this.$input.setAttribute('placeholder', next);

        break;
      }

      case "readonly": {
        this.$input.setAttribute('readonly', next);

        break;
      }

      case "spellcheck": {
        this.$input.setAttribute('spellcheck', next);

        break;
      }
    }
  }

  onValidate(showError: boolean): void {
    validate(this, showError);
  }

  focus() {
    this.$input.focus();
  }

  blur() {
    this.$input.blur();
  }

  onChange() {
    this.shadowRoot.querySelector('.message').innerHTML = '';
    this.$input.classList.remove('error');
    this.internals.setFormValue(this.value, this.value);
  }

  formStateRestoreCallback(state: string) {
    this.value = state;
  }

  formResetCallback(state: string) {
    this.value = this.getAttribute('value') || '';
  }
}

customElements.define('in-text-input', TextInputComponent)
