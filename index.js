import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import registerServiceWorker from './src/registerServiceWorker';
import './index.css';

ReactDOM.render(<App />,
    document.getElementById('root'));
registerServiceWorker();
