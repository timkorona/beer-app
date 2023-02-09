import './App.css';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const App = () => {
  const [data, setData] = useState([]);

  const fetchBeers = async () => {
    await fetch("https://api.punkapi.com/v2/beers?per_page=80")
    .then((response) => response.json())
    .then((data) => {
      data.sort ((a, b) => b.abv - a.abv);
      setData(data);
    });
  };

  const DryHopAlert = (inHopsArray) => {
    for (let i=0; i < inHopsArray.length; i++) {
      if (inHopsArray[i].add.toLowerCase() === "dry hop") {
        return <Alert severity="info">Dry Hopped</Alert>;
      }
    };

    return;
  };

  const LactoseAlert = (inString) => {
    if (inString != null && inString.toLowerCase().includes("lactose")) {
      return (<Alert severity="warning">Contains Lactose</Alert>);
    };

    return;
  };

  return (
    <div className="App">
      <div style={{marginTop: 16, marginBottom: 32}}>
        <Button variant="contained" onClick={fetchBeers}>GET LIST OF BEERS</Button>
      </div>
      <div>
        <TableContainer sx={{maxWidth: '80%', mx: 'auto'}} component={Paper}>
          <Table size="small" aria-label="list of beers">
            <TableHead>
              <TableRow sx={{backgroundColor: 'lightGray'}}>
                <TableCell align="center" sx={{width: '5%'}}>Image</TableCell>
                <TableCell align="center" sx={{width: '15%'}}>Name of Beer</TableCell>
                <TableCell align="center" sx={{width: '20%'}}>Beer Tagline</TableCell>
                <TableCell align="center" sx={{width: '50%'}}>Description</TableCell>
                <TableCell align="center" sx={{width: '5%'}}>ABV</TableCell>
                <TableCell align="center" sx={{width: '5%'}}>IBU</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">
                    <img src={row.image_url} alt="alt_text" style={{height: 100}}></img>
                  </TableCell>
                  <TableCell align="left">
                    {row.name}
                    {LactoseAlert(row.method.twist)}
                    {DryHopAlert(row.ingredients.hops)
                  }</TableCell>
                  <TableCell align="left">{row.tagline}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="center">{row.abv}</TableCell>
                  <TableCell align="center">{row.ibu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      </div>
    </div>
  );
}

export default App;
