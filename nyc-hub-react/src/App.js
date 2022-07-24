import React, {useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
  //   fetch('/api/table/delete_recommendation',{
  //     method:'DELETE',
  //     headers : {
  //       'Content-Type':'application/json'
  //     },
  //     body: JSON.stringify({
  //   'name': "Test Super Garbage"})
  //   })
  //   .then(response => response.json())
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));

    // fetch('/api/table/delete_event',{
    //   method:'DELETE',
    //   headers : {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({
    //   'name': "Test Garbage"})
    // })
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(error => console.log(error));

    // fetch('/api/table/add_event',{
    //   method:'POST',
    //   headers : {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({
    //   'name': "Test Garbage"})
    // })
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(error => console.log(error));

    // fetch('/api/table/add_recommendation',{
    //   method:'POST',
    //   headers : {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({
    //   'name': "Test Garbage"})
    // })
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(error => console.log(error));

    // fetch('/api/table/update_recommendation',{
    //   method:'POST',
    //   headers : {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({
    //   'old_name': "Test Garbage",
    //   'new_name': "Test Super Garbage"})
    // })
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(error => console.log(error));

    // fetch('/api/table/update_recommendation',{
    //   method:'POST',
    //   headers : {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({
    //   'old_name': "Test Garbage",
    //   'new_name': "Test Super Garbage"})
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
