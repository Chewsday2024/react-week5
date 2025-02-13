// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';



import { FunPovider } from './funPack/FunPovider.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './assets/all.scss';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
      <FunPovider>
        <App />
      </FunPovider>
  //</StrictMode>,
)
