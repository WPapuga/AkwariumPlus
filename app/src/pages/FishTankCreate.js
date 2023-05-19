import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom';
import './FishTankCreate.css'

async function postFishTank(details) {
  console.log(details);
  return fetch("http://localhost:3030/postFishTank", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(details)
}).then(data => data.json())
}

function FishTankCreate() {
  const navigate = useNavigate();
  const [fishList, setFishList] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [fishPerPage, setFishPerPage] = useState(3)
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [selectedDeleteQuantity, setSelectedDeleteQuantity] = useState(1)
  const [selectedFish, setSelectedFish] = useState('')

  const [rightFishList, setRightFishList] = useState([])
  const [currentRightPage, setCurrentRightPage] = useState(1)
  const [fishPerRightPage, setFishPerRightPage] = useState(3)
  const [fishTankName, setFishTankName] = useState('')

  const [widthDim, setWidthDim] = useState('')
  const [heightDim, setHeightDim] = useState('')
  const [depthDim, setDepthDim] = useState('')

  const [wsTemp, setWsTemp] = useState('')
  const [wsPh, setWsPh] = useState('')
  const [wsNitrate, setWsNitrate] = useState('')
  const [wsNitrite, setWsNitrite] = useState('')
  const [wsHardness, setWsHardness] = useState('')
  const [wsAmmonia, setWsAmmonia] = useState('')
  const [wsChlorine, setWsChlorine] = useState('')
  const [wsPhosphates, setWsPhosphates] = useState('')
  const [wsCalcium, setWsCalcium] = useState('')
  const [wsMagnesium, setWsMagnesium] = useState('')
  const [wsCo2, setWsCo2] = useState('')




  useEffect(() => {
      setLoading(true);
      fetch('http://localhost:3030/getFish')
        .then(response => response.json())
        .then(data => {
          setFishList(data);
          setLoading(false);
        });
  }, []);
  const indexOfLastFish = currentPage * fishPerPage;
  const indexOfFirstFish = indexOfLastFish - fishPerPage;
  const currentFish = fishList.slice(indexOfFirstFish, indexOfLastFish);
  const paginate = ({selected}) => {
      setCurrentPage(selected + 1);
  };

  const indexOfLastRightFish = currentRightPage * fishPerRightPage;
  const indexOfFirstRightFish = indexOfLastRightFish - fishPerRightPage;
  const currentRightFish = rightFishList.slice(indexOfFirstRightFish, indexOfLastRightFish);
  const paginateRight = ({selected}) => {
      setCurrentRightPage(selected + 1);
  };

  const togglePopUp = () => {
    setDeletePopupVisible(false)
    setSelectedDeleteQuantity(1)
    if (isPopupVisible) {
      setSelectedQuantity(1)
    }
    setPopupVisible(!isPopupVisible)
  };
  const toggleDeletePopUp = () => {
    setPopupVisible(false)
    setSelectedQuantity(1)
    if (isDeletePopupVisible) {
      setSelectedDeleteQuantity(1)
    }
    setDeletePopupVisible(!isDeletePopupVisible)
  };
  const decreaseCounter = () => {
    if (selectedQuantity != 1) {
      setSelectedQuantity(selectedQuantity - 1)
    }
  };
  const increaseCounter = () => {
    setSelectedQuantity(selectedQuantity + 1)
  };
  const decreaseDeleteCounter = () => {
    if (selectedDeleteQuantity != 1) {
      setSelectedDeleteQuantity(selectedDeleteQuantity - 1)
    }
  };
  const increaseDeleteCounter = () => {
    setSelectedDeleteQuantity(selectedDeleteQuantity + 1);
  };
  const addFish = () => {
    const i = rightFishList.findIndex((obj) => obj.id === selectedFish.id);
    if (i !== -1) {
      rightFishList[i].quantity += selectedQuantity;
      setRightFishList([...rightFishList]);
      togglePopUp();
    } else {
      let newFish = {
        id: selectedFish.id,
        name: selectedFish.name,
        image: selectedFish.image,
        quantity: selectedQuantity
      }
      setRightFishList([...rightFishList, newFish]);
      togglePopUp();
    }
  };
  const removeFish = () => {
    const i = rightFishList.findIndex((obj) => obj.id === selectedFish.id);
    rightFishList[i].quantity -= selectedDeleteQuantity;
    if(rightFishList[i].quantity <= 0) {
      rightFishList.splice(i, 1);
    }
    toggleDeletePopUp();
  };
  const createFishTank = async e => {
    e.preventDefault();
    const res = await postFishTank({
      fishTankName,
      width: widthDim,
      height: heightDim,
      depth: depthDim,
      water: {
        tempeture: wsTemp,
        ph: wsPh,
        nitrate: wsNitrate,
        nitrite: wsNitrite,
        hardness: wsHardness,
        ammonia: wsAmmonia,
        chlorine: wsChlorine,
        phosphates: wsPhosphates,
        calcium: wsCalcium,
        magnesium: wsMagnesium,
        co2: wsCo2
      },
      fish: rightFishList,
      date: Date.now()
    });
    if(res.message == "Sukces"){
      alert("Utworzono akwarium")
      navigate('/konto', { replace: true });
      window.location.reload(false);
    } else {
      alert("Błąd")
    }
} 

  return (
    <body>
      <h1>1. Wybierz nazwę dla twojego akwarium</h1>
      <Form className='FishTankNameForm'>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className='FishTankName' type="text" placeholder="Wpisz nazwę akwarium" value={fishTankName} onChange={(event) => setFishTankName(event.target.value)} />
        </Form.Group>
      </Form>
      <h1>2. Wybierz ryby do twojego akwarium</h1>
      {isPopupVisible && (
        <div className="popup">
          <h2>Ile ryb chcesz dodać:</h2>
          <div className='UpperPopup'>
            <img src={`images/${selectedFish.image}`}></img>
          </div>
          <div className='MiddlePopup'>
            <Button onClick={decreaseCounter} className='changeButton'>-</Button>
            <div className='QuantityContainer'><a>{selectedQuantity}</a></div>
            <Button onClick={increaseCounter} className='changeButton'>+</Button>
          </div>
          <div className='LowerPopup'>
            <Button onClick={togglePopUp}>Anuluj</Button>
            <Button onClick={addFish}>Dodaj</Button>
          </div>
        </div>
      )}
      {isDeletePopupVisible && (
        <div className="popup">
          <h2>Ile ryb chcesz usunąć:</h2>
          <div className='UpperPopup'>
            <img src={`images/${selectedFish.image}`}></img>
          </div>
          <div className='MiddlePopup'>
            <Button onClick={decreaseDeleteCounter} className='changeButton'>-</Button>
            <div className='QuantityContainer'><a>{selectedDeleteQuantity}</a></div>
            <Button onClick={increaseDeleteCounter} className='changeButton'>+</Button>
          </div>
          <div className='LowerPopup'>
            <Button onClick={toggleDeletePopUp}>Anuluj</Button>
            <Button onClick={removeFish}>Usuń</Button>
          </div>
        </div>
      )}
    <div className='FishBody'>
      <div className='FishChoiceConatiner'>
        <div className='FishChoiceConatinerLeft'>
          <div className="FishContainer">
              <h2>Wybierz ryby</h2>
              {currentFish.map((item) => (
                  <div className='Fish' key={item.id}>
                      <img className='FishImage' src={`images/${item.image}`} onClick={ () => {togglePopUp(); setSelectedFish(item)}}></img>
                      <h3 className='FishName'>{item.name}</h3>
                  </div>
              ))}
          </div>
          <ReactPaginate
                    onPageChange={paginate}
                    pageCount={Math.ceil(fishList.length / fishPerPage)}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-number'}
                    previousLinkClassName={'prev-navigation-button'}
                    nextLinkClassName={'next-navigation-button'}
                    activeLinkClassName={'active'}
          />
        </div>
        <div className='FishChoiceConatinerRight'>
          <div className="FishContainer">
              <h2>Twoje ryby</h2>
              {currentRightFish.map((item) => (
                  <div className='Fish' key={item.id}>
                      <img className='FishImage' src={`images/${item.image}`} onClick={ () => {toggleDeletePopUp(); setSelectedFish(item)}}></img>
                      <h3 className='FishName'>{item.name} x{item.quantity}</h3>
                  </div>
              ))}
          </div>
          {rightFishList.length > 0 ? (
          <ReactPaginate
                    onPageChange={paginateRight}
                    pageCount={Math.ceil(rightFishList.length / fishPerRightPage)}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-number'}
                    previousLinkClassName={'prev-navigation-button'}
                    nextLinkClassName={'next-navigation-button'}
                    activeLinkClassName={'active'}
          />
          ): () => {return null}} 
        </div>
      </div>
    </div>
    <h1>3. Podaj wymiary twojego akwarium</h1>
    <div className='DimensionsContainer'>
      <div className='DimensionsContainerInner'>
        <img className='FishTankImg' src='./images/fishTank.jpg'></img>
        <Form.Control className='WidthDim' type="text" placeholder="Wpisz szerokość (cm)" value={widthDim} onChange={(event) => setWidthDim(event.target.value)} />
        <Form.Control className='HeightDim' type="text" placeholder="Wpisz wysokość (cm)" value={heightDim} onChange={(event) => setHeightDim(event.target.value)} />
        <Form.Control className='DepthDim' type="text" placeholder="Wpisz głębokość (cm)" value={depthDim} onChange={(event) => setDepthDim(event.target.value)} />
        <div class="clear"></div>
      </div>
    </div>
    <h1>4. Wybierz parametry wody w twoim akwarium</h1>
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
      <Button className='SubmitFishTank' onClick={createFishTank}>Stwórz Akwarium</Button>
    </div>
    </body>
  )
}

export default FishTankCreate