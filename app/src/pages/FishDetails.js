import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import './FishDetails.css'


function FishDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [fish, setFish] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      fetch(`http://localhost:3030/getFishDetails?id=${id}`)
        .then(response => response.json())
        .then(data => {
          setFish(data);
          console.log(data);
          setLoading(false);
        });
  }, []);

  return (
    <body className='FishBody'>
      <div className='FishDetailsContainer'>
        <h1 className='FishName'>{loading ? 'Wczytywanie...' : fish.name}</h1><br></br>
        <img className='FishImage' src={`/images/${fish.image}`}></img>
        <div className='FishDescription'>
          <h2>Opis ryby</h2>
          <p>{fish.description}</p> 
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
              <td>Minimum</td>
            </tr>
            <tr>
              <td>Temperatura</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Twardość wody</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>ph</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Amoniak</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Azotyn</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Azotan</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Fosforany</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Wapń</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Magnez</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Chlor</td>
              <td>123</td>
              <td>123</td>
            </tr>
            <tr>
              <td>Dwutlenek Węgla</td>
              <td>123</td>
              <td>123</td>
            </tr>
          </tbody>
        </Table>
        </div>
      </div>
    </body>
  )
}

export default FishDetails