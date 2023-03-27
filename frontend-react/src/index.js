import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HashRouter} from 'react-router-dom';
import axios from 'axios'


axios.backend = null; 

axios.fixUrl = function(original) {

  if(!axios.backend && original.indexOf("/")===0) return original;
  let url = null;
  try {
    url = new URL(original);
  }catch(e){
    url = new URL(axios.backend + original);
  }

  if(!axios.backend) return url.pathname;

  url.hostname = axios.backendUrl.hostname;
  url.port = axios.backendUrl.port;

  return url.href;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);