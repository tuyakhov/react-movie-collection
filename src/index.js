import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
	<Router>
		<App storage={localStorage} />
	</Router>
	, document.getElementById('root')
);
