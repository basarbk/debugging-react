import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import server from './mocks/browser';

async function main(){

  await server.start();
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
main();
