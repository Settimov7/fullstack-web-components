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

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  variant: 'secondary',
};

let icon = null;

if (window.FontAwesome) {
  icon = window.FontAwesome.icon({ prefix: "fas", iconName: 'plus'});
}

const svg = icon?.node[0];

svg.setAttribute('aria-hidden', 'true');

function IconTemplate ({ label, variant, svg }) {
  return html`
    <button class='${variant}' is='in-button' aria-labelledby="close-button-label">
      <span id="close-button-label" hidden>${label}</span>
      ${svg}
    </button>
  `;
}

export const Icon = IconTemplate.bind({});
Icon.args = {
  variant: "icon icon-close",
  label: 'Close',
  svg,
}

function DisabledTemplate({ label, variant }) {
  return html`
    <button class='${variant}' is='in-button' disabled>${label}</button>
  `;
}

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  variant: "primary",
  label: 'Submit',
}
