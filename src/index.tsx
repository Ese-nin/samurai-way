import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import state from "./Redux/State";


ReactDOM.render(
    <App appState={state}/>,

    document.getElementById('root')
);