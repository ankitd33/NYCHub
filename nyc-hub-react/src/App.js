import React, {useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    fetch('/api/table/events',{
      method:'POST',
      headers : {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({'top_x': 5})
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));

    fetch('/api/table/recommendations',{
      method:'POST',
      headers : {
        'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello
        </p>
      </header>
    </div>
  );
}

export default App;
