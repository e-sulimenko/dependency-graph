import { getTemplate } from './template';

import './style.css';

export const boostrapUi = (container: HTMLElement) => {
  const template = getTemplate();
  container.append(template);
};
