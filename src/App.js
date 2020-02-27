import React from 'react';
import Homepage from './components/Homepage';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Misfits Market" />
      </header>
        <Homepage />
    </div>
  );
}

export default App;
