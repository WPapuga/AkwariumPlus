import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import './FishDetails.css'


function FishDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [fish, setFish] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    setLoading(true);
    fetch(`http://localhost:3030/getFishDetails?id=${id}`)
        .then(response => response.json())
        .then( data => {
          setFish(data);
          console.log(data);
          setLoading(false);
        });
  }, []);
  return (
    <body className='FishBody'>
      <div className='FishDetailsContainer'>
        <h1 className='FishName'>{loading ? 'Wczytywanie...' : fish.nazwa}</h1><br></br>
        <img className='FishImage' src={`/images/${fish.obraz}`}></img>
        <div className='FishDescription'>
          <h2>Opis ryby</h2>
          <p>{fish.opis}</p>
        </div>
        <div className='WaterSpecs'>
        <Table>
          <thead>
            <tr>
              <th colSpan={3}>Specyfikacja Wody</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Minimum</td>
              <td>Maksumum</td>
            </tr>
            <tr>
              <td>Temperatura</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[0] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[0] : 0}</td>
            </tr>
            <tr>
              <td>Twardość wody</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[2] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[2] : 0}</td>
            </tr>
            <tr>
              <td>ph</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[1] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[1] : 0}</td>
            </tr>
            <tr>
              <td>Amoniak</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[3] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[3] : 0}</td>
            </tr>
            <tr>
              <td>Azotyn</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[4] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[4] : 0}</td>
            </tr>
            <tr>
              <td>Azotan</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[5] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[5] : 0}</td>
            </tr>
            <tr>
              <td>Fosforany</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[6] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[6] : 0}</td>
            </tr>
            <tr>
              <td>Wapń</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[7] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[7] : 0}</td>
            </tr>
            <tr>
              <td>Magnez</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[8] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[8] : 0}</td>
            </tr>
            <tr>
              <td>Chlor</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[9] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[9] : 0}</td>
            </tr>
            <tr>
              <td>Dwutlenek Węgla</td>
              <td>{fish.parametrywodymin ? fish.parametrywodymin[10] : 0}</td>
              <td>{fish.parametrywodymax ? fish.parametrywodymax[10] : 0}</td>
            </tr>
          </tbody>
        </Table>
        </div>
      </div>
    </body>
  )
}

export default FishDetails