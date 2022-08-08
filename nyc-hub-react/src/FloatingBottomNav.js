import React, { useEffect, useState } from 'react';
import './App.css';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Card from '@mui/material/Card';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

function FloatingBottomNav(props) {
    const cardStyle = {
        width: 500,
        marginTop: 'auto',
        marginBottom: '20px',
        backgroundColor: '#000000',
    };

    return <Card sx={cardStyle} variant="outlined">
        <BottomNavigation
            showLabels
            value={props.value}
            onChange={(event, newValue) => {
                props.setValue(newValue);
            }}
            sx={{
                backgroundColor: '#000000',
            }}
        >
            <BottomNavigationAction sx={{ color: 'white' }} label="Recs" icon={<AddLocationAltOutlinedIcon />} value="Recs" />
            <BottomNavigationAction sx={{ color: 'white' }} label="Map" icon={<MapOutlinedIcon />} value="Map" />
            <BottomNavigationAction sx={{ color: 'white' }} label="Events" icon={<EventAvailableOutlinedIcon />} value="Events" />
        </BottomNavigation>
    </Card>;
}

export default FloatingBottomNav;
