import React, { useEffect, useState } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import FloatingBottomNav from './FloatingBottomNav';
import RecsContent from './RecsContent';
import EventsContent from './EventsContent';
import MapContent from './MapContent';


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

    // fetch('/api/table/events?top_x=5', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));

    // fetch('/api/table/recommendations', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));
  }, []);

  const [value, setValue] = useState("Recs");

  const contentAreaStyle = {
    height: '85vh',
    width: '100vh',
    marginTop: '35px',
  };

  return (
    <div className="App">
      <div style={contentAreaStyle}>
        {value === 'Recs' ? <RecsContent /> : null}
        {value === 'Map' ? <MapContent /> : null}
        {value === 'Events' ? <EventsContent /> : null}
      </div>
      <FloatingBottomNav value={value} setValue={setValue} />
    </div>
  );
}

export default App;
