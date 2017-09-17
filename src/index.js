import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-19760178-5');
ReactGA.pageview('/');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
