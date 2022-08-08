import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


function RecsContent() {
  const [recsData, setRecsData] = useState([]);

  useEffect(() => {
    fetch('/api/table/recommendations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        setRecsData([]);
        response.forEach(element => {
          const rank = element?.ranking;
          const recName = element?.name;
          const visited = element?.visited ?? false;
          const loc = '' + element?.longitude + ', ' + element?.latitude;
          const description = element?.description;
          const notes = element?.notes;
          const tags = JSON.parse(element?.tags ?? {})?.tags;
          const links = JSON.parse(element?.links ?? {});
          const mydata = {
            rank: rank,
            recName: recName,
            visited: visited,
            loc: loc,
            description: description,
            notes: notes,
            tags: tags,
            links: links,
          };
          setRecsData([...recsData, mydata]);
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
      field: 'recName',
      headerName: 'Rec Name',
      width: 150,
    },
    {
      field: 'visited',
      headerName: 'Visited',
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
      field: 'notes',
      headerName: 'Notes',
      width: 150,
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 150,
    },
    {
      field: 'links',
      headerName: 'Links',
      width: 150,
    },
  ];

  return <DataGrid
    getRowId={(row) => row.recName}
    rows={recsData}
    columns={columns}
    pageSize={25}
    components={{
      Toolbar: GridToolbar,
    }}
    disableColumnSelector
    disableDensitySelector
    rowsPerPageOptions={[25]}
    disableSelectionOnClick
  />
}

export default RecsContent;
