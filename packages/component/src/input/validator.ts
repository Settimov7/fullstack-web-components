import { ValidityStateFlags } from 'types/lib.elementInternals';

type Validation = {
  flag: ValidityStateFlags,
  condition: (element: HTMLElement) => boolean,
  message?: string,
}

export type Validator = {
  validations: Validation[],
};

export function validate(elem: any, showError: boolean) {
  if (!elem.$validator || !elem.$validator.validations) {
    return;
  }

  const activeValidators = [];
  const messageElem = elem.shadowRoot.querySelector(".message")

  if (messageElem) {
    messageElem.innerHTML = '';
  }

  elem.$validator.validations.forEach((validator) => {
    if (validator.condition(elem)) {
      elem.setValidity(validator.flag, validator.message);
      activeValidators.push(validator);

      if (showError) {
        if (elem.$input) {
          elem.$input.setAttribute("aria-invalid", "true");
          elem.$input.classList.add('error');
        }

        if (messageElem) {
          const div = document.createElement('div');

          div.innerHTML = validator.message;

          messageElem.appendChild(div);
        }
      }
    }
  });

  if (!activeValidators.length) {
    elem.setValidity({});

    if (elem.$input) {
      elem.$input.classList.remove('error')
    }

    if (messageElem) {
      messageElem.innerHTML = '';
    }
  }

  elem.dispatchEvent(new CustomEvent("validate", { bubbles: true }));
}
