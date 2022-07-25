import React, {useEffect, useState} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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

  const [value, setValue] = useState("Recents");



  return (
    <div className="App">
      {/* This header className is the styling to make up the header take the whole page -  check css*/}
      <header className="App-header">
        <p>
          Hello
        </p>
      </header>
      <Fab color="primary" aria-label="add">
  <AddIcon />
</Fab>
      <Box sx={{ width: 500 }}>
      <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
  >
    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} value="Recents"/>
    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} value="Favorites"/>
    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} value="Nearby"/>
  </BottomNavigation>
  </Box>
    </div>
  );
}

export default App;
