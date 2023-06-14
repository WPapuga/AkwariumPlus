import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';import './FishTankEdit.css'

async function postWaterSpecs(details) {
  console.log(details);
  return fetch("http://localhost:3030/postWaterSpecs", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(details)
}).then(data => data.json())
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function EditWater() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const [boolSend,setBoolSend] = useState('')
    const [wsTemp, setWsTemp] = useState(0)
    const [wsPh, setWsPh] = useState(0)
    const [wsNitrate, setWsNitrate] = useState(0)
    const [wsNitrite, setWsNitrite] = useState(0)
    const [wsHardness, setWsHardness] = useState(0)
    const [wsAmmonia, setWsAmmonia] = useState(0)
    const [wsChlorine, setWsChlorine] = useState(0)
    const [wsPhosphates, setWsPhosphates] = useState(0)
    const [wsCalcium, setWsCalcium] = useState(0)
    const [wsMagnesium, setWsMagnesium] = useState(0)
    const [wsCo2, setWsCo2] = useState(0)

    const createWaterSpecs = async e => {
      e.preventDefault();
      const res = await postWaterSpecs({
        id_akwarium: id,
        temperature: wsTemp,
        ph: wsPh,
        nitrate: wsNitrate,
        nitrite: wsNitrite,
        hardness: wsHardness,
        ammonia: wsAmmonia,
        chlorine: wsChlorine,
        phosphates: wsPhosphates,
        calcium: wsCalcium,
        magnesium: wsMagnesium,
        co2: wsCo2,
        user_id: sessionStorage.getItem("id"),
        date: formatDate(Date.now())
      });
      if(res.message == "Sukces"){
        toast.success('Dodano stan wody');
        setTimeout(function(){ navigate(`/szczegolyAkwarium?id=${id}`, { replace: true }); }, 3000);
      } else {
        toast.error('Błąd');
      }
  } 

  return (
    <body>
    <h1>Dodaj nowe parametry wody</h1>
    <div className='WaterSpecsContainer'>
      <div className='WaterSpecsContainerInner'>
        <Table className='WaterSpecsTable'>
            <tbody>
              <tr>
                <td>Temperatura</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz temperature" value={wsTemp} onChange={(event) => setWsTemp(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Twardość wody</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz twardość wody" value={wsHardness} onChange={(event) => setWsHardness(event.target.value)} /></td>
              </tr>
              <tr>
                <td>ph</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ph" value={wsPh} onChange={(event) => setWsPh(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Amoniak</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość amoniaku" value={wsAmmonia} onChange={(event) => setWsAmmonia(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Azotyn</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość azotynu" value={wsNitrite} onChange={(event) => setWsNitrite(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Azotan</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość azotanu" value={wsNitrate} onChange={(event) => setWsNitrate(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Fosforany</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość fosforanów" value={wsPhosphates} onChange={(event) => setWsPhosphates(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Wapń</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość wapnia" value={wsCalcium} onChange={(event) => setWsCalcium(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Magnez</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość magnezu" value={wsMagnesium} onChange={(event) => setWsMagnesium(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Chlor</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość chloru" value={wsChlorine} onChange={(event) => setWsChlorine(event.target.value)} /></td>
              </tr>
              <tr>
                <td>Dwutlenek Węgla</td>
                <td><Form.Control className='WaterSpecsInput' type="text" placeholder="Wpisz ilość CO2" value={wsCo2} onChange={(event) => setWsCo2(event.target.value)} /></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className='LastContainer'>
        <Button className='SubmitFishTank' onClick={createWaterSpecs}>Dodaj</Button>
      </div>
    </body>
  )
}

export default EditWater