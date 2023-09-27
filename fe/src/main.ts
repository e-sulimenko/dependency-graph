import { boostrapCy } from './cy';
import { boostrapUi } from './ui';

import './style.css';

const cyContiner = document.getElementById('cy');
const uiContiner = document.getElementById('ui');

if (cyContiner == null) throw new Error('cy container element is missing');
if (uiContiner == null) throw new Error('ui container element is missing');

boostrapUi(uiContiner);
boostrapCy(cyContiner);
