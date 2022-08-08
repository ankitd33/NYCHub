import React, { useEffect, useState } from 'react';
import {
    DataGrid, GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';

function EventsContent() {
    const [eventsData, setEventsData] = useState([]);

    useEffect(() => {
        fetch('/api/table/events', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(response => {
                setEventsData([]);
                response.forEach(element => {
                    const rank = element?.ranking;
                    const evName = element?.name;
                    const loc = '' + element?.longitude + ', ' + element?.latitude;
                    const description = element?.description;
                    const tags = JSON.parse(element?.tags ?? {})?.tags;
                    const mydata = {
                        rank: rank,
                        evName: evName,
                        loc: loc,
                        description: description,
                        tags: tags,
                    };
                    setEventsData([...eventsData, mydata]);
                });
            })
            .catch(error => console.log(error));
    }, []);

    const columns = [
        {
            field: 'rank',
            headerName: 'Rank',
            width: 50,
        },
        {
            field: 'evName',
            headerName: 'Event Name',
            width: 150,
        },
        {
            field: 'time',
            headerName: 'Time',
            width: 75,
        },
        {
            field: 'loc',
            headerName: 'Location',
            width: 110,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 200,
        },
        {
            field: 'tags',
            headerName: 'Tags',
            width: 150,
        },
    ];

    function CustomToolbar(props) {
        return (
            <GridToolbarContainer {...props}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
            </GridToolbarContainer>
        );
    }

    return <DataGrid
        getRowId={(row) => row.evName}
        rows={eventsData}
        columns={columns}
        pageSize={25}
        components={{
            Toolbar: CustomToolbar,
        }}
        rowsPerPageOptions={[25]}
        disableSelectionOnClick
    />
}

export default EventsContent;
