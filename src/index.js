import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import "./Style/Style.css"
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

