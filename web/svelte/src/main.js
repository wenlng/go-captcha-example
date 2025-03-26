import App from './App.svelte';

import axios from 'axios'

// axios.defaults.baseURL = 'http://47.104.180.148:8081/';
axios.defaults.baseURL = 'http://0.0.0.0:9001/';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;