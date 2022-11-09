import { html } from "lit-html";

import { TextInputComponent } from './text-input';
import { ButtonComponent } from "../button/button";

export default {
  title: 'Components/Inputs/TextInput',
  component: 'in-text-input',
};

const validators = {
  username: {
    validations: [
      {
        flag: {
          valueMissing: true,
        },
        message: 'Error: Required, please enter a username.',
        condition: (input) => input.required && input.value.length <= 0,
      },
      {
        flag: {
          toShort: true,
        },
        message: 'Error: Minimum length not met, please supply a value with at least 8 characters.',
        condition: (input) => input.minLength && input.value.length < input.minLength,
      }
    ],
  },
  password: {
    validations: [
      {
        flag: {
          valueMissing: true,
        },
        message: 'Error: Required, please enter a password.',
        condition: (input) => input.required && input.value.length <= 0,
      },
      {
        flag: {
          toShort: true,
        },
        message: 'Error: Minimum length not met, please supply a value with at least 8 characters.',
        condition: (input) => input.minLength && input.value.length < input.minLength,
      },
      {
        flag: {
          patternMismatch: true,
        },
        message: 'Please use at least one uppercase, uppercase letter, special character, and number.',
        condition: (input) => input.pattern && input.value.match(new RegExp(input.pattern)) === null,
      }
    ],
  },
};

const PrimaryTemplate = ({ onValidate, validators }) => {
  setTimeout(() => {
    const input = document.querySelector(`[name="username"]`);

    input.$validator = validators['username'];
  }, 0);

  return html`
    <form @validate="${onValidate}">
      <in-text-input required name="username"></in-text-input>
    </form>
  `;
};

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  validators,
  onValidate: () => {
    console.log(document.querySelector(`[name="username"]`));

    if (!document.querySelector(`[name="username"]`).validity.valid) {
      console.warn('INVALID');
    } else {
      console.log('VALID');
    }
  },
};

const DisabledTemplate = ({}) => {
  return html`
    <in-text-input name='test-input' disabled value='disabled input'></in-text-input>
  `;
};

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {};

const ErrorTemplate = ({}) => {
  setTimeout(() => {
    const input = document.querySelector(`[name="username"]`);

    input.$validator = validators['username'];
    input.focus();
    input.blur();
  }, 0);

  return html`
    <in-text-input
      class='form-control'
      type='text'
      id='username'
      name='username'
      required
    ></in-text-input>
  `;
};

export const Error = ErrorTemplate.bind({});
Error.args = {};

const FormTemplate = ({ headline, onSubmit, onValidate, onFormData }) => {
  setTimeout(() => {
    for(let prop in validators) {
      const input = document.querySelector(`[name="${prop}"]`);

      input.$validator = validators[prop];
    }
  }, 0);

  return html`
    <h4 slot="header">${headline}</h4>
    
    <form
      name='foo'
      slot='content'
      @formdata="${onFormData}"
      @validate="${onValidate}"
      @submit="${onSubmit}"
    >
      <fieldset>
        <legend>Login Form</legend>

        <label for="username">Username</label>
        
        <in-text-input
          class="form-control"
          type="text"
          id="username"
          name="username"
          required
          minlength="8"
        ></in-text-input>

        <label for="password">Password</label>

        <in-text-input
          class="form-control"
          type="password"
          id="password"
          name="password"
          required
          minlength="8"
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        ></in-text-input>

        <button class="primary" is="in-button" type="submit">Submit</button>
      </fieldset>
    </form>
  `;
}

export const Form = FormTemplate.bind({});
Form.args = {
  headline: "Login",
  onSubmit: (ev) => {
    console.log(new FormData(ev.target));

    ev.preventDefault();
  },
  onFormData: (ev) => {
    console.log(ev);

    for (let value of ev.formData.values()) {
      console.log(value);
    }
  },
  onValidate: () => {
    const validations = [];

    for (let prop in validators) {
      validations.push(document.querySelector(`[name="${prop}"]`).validity.valid);
    }

    if (validations.filter((val) => val === false).length) {
      console.warn("INVALID");
    } else {
      console.log('VALID');
    }
  },
};
