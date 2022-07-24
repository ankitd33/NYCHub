import React, {useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // fetch('/api/table/add_event',{
    //   method:'POST',
    //   headers : {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({
    //   'name': "Poster House Block Party",
    //   'ranking': 8.8,
    //   'time': 1659801600,
    //   'latitude': 40.74231083209973,
    //   'longitude': -73.98943300369957,
    //   'description': "Free activities, giveaways and poster making",
    //   "tags": "{'tags':['close', 'free'] }"})
    // })
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(error => console.log(error));

    fetch('/api/table/events?top_x=5',{
      method:'GET',
      headers : {
        'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));

    fetch('/api/table/recommendations',{
      method:'GET',
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
