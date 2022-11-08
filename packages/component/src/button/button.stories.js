import { html } from "lit-html";

import { ButtonComponent } from './button';

export default {
  title: 'Components/Inputs/Button',
  component: 'in-button',
};

function Template({ label, variant }) {
  return html`
    <button class='${variant}' is='in-button'>${label}</button>
  `;
}

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  variant: 'primary',
};
