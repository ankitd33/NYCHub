import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const k = 2;
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
    fetch('/api/all_events').then(res => res.json()).then(data => {
      console.log(data.all_events)
    });
    fetch('/api/first_event').then(res => res.json()).then(data => {
      console.log(data.first_event)
    });
    fetch(`/api/first_k_events?k=${k}`).then(res => res.json()).then(data => {
      console.log(data.first_k_events);
    });
    fetch('/api/table/events',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;
