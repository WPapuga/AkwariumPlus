import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './FishTankCreate.css'

function FishTankCreate() {
  const [fishList, setFishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fishPerPage, setFishPerPage] = useState(3);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedDeleteQuantity, setSelectedDeleteQuantity] = useState(1);
  const [selectedFish, setSelectedFish] = useState('');

  const [rightFishList, setRightFishList] = useState([]);
  const [currentRightPage, setCurrentRightPage] = useState(1);
  const [fishPerRightPage, setFishPerRightPage] = useState(3);
  const [fishTankName, setFishTankName] = useState('');


  useEffect(() => {
      setLoading(true);
      fetch('http://localhost:3030/getFish')
        .then(response => response.json())
        .then(data => {
          setFishList(data);
          console.log(data);
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

  return (
    <body>
      <h1>Wybierz nazwę dla swojego akwarium</h1>
      <Form className='FishTankNameForm'>
        <Form.Group controlId="formBasicEmail">
          <Form.Control className='FishTankName' type="text" placeholder="Wpisz nazwę akwarium" value={fishTankName} onChange={(event) => setFishTankName(event.target.value)} />
        </Form.Group>
      </Form>
      <h1>Wybierz ryby do akwarium</h1>
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
                    previousLabel={'Poprzednia Strona'}
                    nextLabel={'Następna Strona'}
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
          <ReactPaginate
                    onPageChange={paginateRight}
                    pageCount={Math.ceil(rightFishList.length / fishPerRightPage)}
                    previousLabel={'Poprzednia Strona'}
                    nextLabel={'Następna Strona'}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-number'}
                    previousLinkClassName={'prev-navigation-button'}
                    nextLinkClassName={'next-navigation-button'}
                    activeLinkClassName={'active'}
          />
        </div>
      </div>
    </div>
    <h1>Wybierz wymiary akwarium</h1>
    <h1>Wybierz parametry wody w akwarium</h1>
    </body>
  )
}

export default FishTankCreate