import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import FishList from "../Components/FishList";
import ReactPaginate from "react-paginate";
import './FishTankDetails.css'
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";


function FishTankDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [fishTank, setFishTank] = useState({});
  const [loading, setLoading] = useState(false);
  const [fishList, setFishList] = useState([]);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [fishPerPage, setFishPerPage] = useState(3);
  const [parameters, setParameters] = useState([]);
  const [equipment, setEquipment] = useState([]);


  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3030/getFishTankDetails?id=${id}`)
        .then(response => response.json())
        .then(data => {
          setFishTank(data);
          console.log(data);
          setFishList(data.ryby)
          console.log(data.ryby)
          setParameters(data.parametry_wody);
          setEquipment(data.wyposazenie);
          setLoading(false);
        });
  }, [])
  const indexOfLastFish = page1 * fishPerPage;
  const indexOfFirstFish = indexOfLastFish - fishPerPage;
  const currentFish = fishList.slice(indexOfFirstFish, indexOfLastFish);

  const indexOfLastEquipment = page2 * fishPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - fishPerPage;
  const currentEquipment = equipment.slice(indexOfFirstEquipment, indexOfLastEquipment);

  function handlePageChange1(selectedPage) {
    setPage1(selectedPage.selected+1)
  }

  function handlePageChange2(selectedPage) {
    setPage2(selectedPage.selected+1);
  }

  console.log(parameters);

  return (
      <body>
          <h1>Akwarium {id}: {fishTank.nazwa}</h1>
          <div className="DimensionsContainer">
            <div className="DimensionsContainerInner">
              <img className="FishTankImg" src="./images/fishTank.jpg" alt="Fish Tank"></img>
                <div className="WidthDim">Długość: {fishTank.dlugosc_cm}</div>
                <div className="DepthDim">Szerokość: {fishTank.szerokosc_cm}</div>
                <div className="HeightDim">Głębokość: {fishTank.wysokosc_cm}</div>
            </div>
            <div className="clear"></div>
          </div>

          <h2>Twoje ryby: </h2>
          <FishList fish={currentFish} loading={loading}/>
          <ReactPaginate
              onPageChange={handlePageChange1}
              pageCount={Math.ceil(fishList.length / fishPerPage)}
              previousLabel={'Poprzednia Strona'}
              nextLabel={'Następna Strona'}
              containerClassName={'pagination'}
              pageLinkClassName={'page-number'}
              previousLinkClassName={'prev-navigation-button'}
              nextLinkClassName={'next-navigation-button'}
              activeLinkClassName={'active'}
          />
          <h2>Twoje wyposażenie: </h2>
          <FishList fish={currentEquipment} loading={loading}/>
          <ReactPaginate
              onPageChange={handlePageChange2}
              pageCount={Math.ceil(equipment.length / fishPerPage)}
              previousLabel={'Poprzednia Strona'}
              nextLabel={'Następna Strona'}
              containerClassName={'pagination'}
              pageLinkClassName={'page-number'}
              previousLinkClassName={'prev-navigation-button'}
              nextLinkClassName={'next-navigation-button'}
              activeLinkClassName={'active'}
          />
      <h2>Parametry wody na {fishTank.data_pomiaru}:</h2>
          <div className='WaterSpecsContainer'>
            <div className='WaterSpecsContainerInner'>
              <Table className='WaterSpecsTable'>
                <tbody>
                <tr>
                  <td>Temperatura</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[0]}</td>
                </tr>
                <tr>
                  <td>Twardość wody</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[1]}</td>
                </tr>
                <tr>
                  <td>ph</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[2]}</td>
                </tr>
                <tr>
                  <td>Amoniak</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[3]}</td>
                </tr>
                <tr>
                  <td>Azotyn</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[4]}</td>
                </tr>
                <tr>
                  <td>Azotan</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[5]}</td>
                </tr>
                <tr>
                  <td>Fosforany</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[6]}</td>
                </tr>
                <tr>
                  <td>Wapń</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[7]}</td>
                </tr>
                <tr>
                  <td>Magnez</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[8]}</td>
                </tr>
                <tr>
                  <td>Chlor</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[9]}</td>
                </tr>
                <tr>
                  <td>Dwutlenek Węgla</td>
                  <td>{!fishTank.parametry_wody ? 0:fishTank.parametry_wody[10]}</td>
                </tr>
                </tbody>
              </Table>
            </div>
          </div>
      </body>
);
}

export default FishTankDetails