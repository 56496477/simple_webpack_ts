import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './view/app.jsx';

import 'assets/scss/common';

module.hot && module.hot.accept();

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter> 
    , document.getElementById('root')
)