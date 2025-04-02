/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

import axios from 'axios'

const root = document.getElementById('root');

//////////////////////////////////////////////////////////
// Tip:
// This URL is for effects demonstration only,
// please do not use in production environment.
axios.defaults.baseURL = 'http://47.104.180.148:8081/';
//////////////////////////////////////////////////////////

// axios.defaults.baseURL = 'http://0.0.0.0:9001/';

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root);
