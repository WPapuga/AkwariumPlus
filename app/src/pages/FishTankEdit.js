import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom';
import './FishTankEdit.css'

async function setEquipmentLists(id_akwarium,wyposazenie) {
  console.log(wyposazenie);
  const sen = []
  wyposazenie.map((wypos)=>{
    sen.push({
      id: wypos.id,
      
    });
  });
  return fetch(`http://localhost:3030/akwarium/${id_akwarium}/wyposazenie`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    });
}

async function getEquipmentLists(id_akwarium) {
  return fetch(`http://localhost:3030/akwarium/${id_akwarium}/wyposazenie`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
}

function FishTankCreate() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const [equipmentList, setEquipmentList] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [equipmentPerPage, setEquipmentPerPage] = useState(3)
    const [isPopupVisible, setPopupVisible] = useState(false)
    const [isDeletePopupVisible, setDeletePopupVisible] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [selectedDeleteQuantity, setSelectedDeleteQuantity] = useState(1)
    const [selectedEquipment, setSelectedEquipment] = useState('')

    const [rightEquipmentList, setRightEquipmentList] = useState([])
    const [currentRightPage, setCurrentRightPage] = useState(1)
    const [equipmentPerRightPage, setequipmentPerRightPage] = useState(3)
    const [boolSend,setBoolSend] = useState('')




  useEffect(() => {
      setLoading(true);
      fetch('http://localhost:3030/getEquipment')
        .then(response => response.json())
        .then(data => {
          setEquipmentList(data);
          setLoading(false);
        });
      //   fetch(`http://localhost:3030/akwarium/${id}/wyposazenie`)
      // .then(response => response.json())
      // .then(data => {
      //   console.log(data);
      // });
  }, []);
  const indexOfLastEquipment = currentPage * equipmentPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - equipmentPerPage;
  const currentEquipment = equipmentList.slice(indexOfFirstEquipment, indexOfLastEquipment);
  const paginate = ({selected}) => {
      setCurrentPage(selected + 1);
  };

  const indexOfLastRightEquipment = currentRightPage * equipmentPerRightPage;
  const indexOfFirstRightEquipment = indexOfLastRightEquipment - equipmentPerRightPage;
  const currentRightEquipment = rightEquipmentList.slice(indexOfFirstRightEquipment, indexOfLastRightEquipment);
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
  const addEquipment = () => {
    const i = rightEquipmentList.findIndex((obj) => obj.id === selectedEquipment.id);
    if (i !== -1) {
      rightEquipmentList[i].quantity += selectedQuantity;
      setRightEquipmentList([...rightEquipmentList]);
      togglePopUp();
    } else {
      let newEquipment = {
        id: selectedEquipment.id,
        nazwa: selectedEquipment.nazwa,
        obraz: selectedEquipment.obraz,
        quantity: selectedQuantity
      }
      setRightEquipmentList([...rightEquipmentList, newEquipment]);
      togglePopUp();
    }
  };
  const removeEquipment = () => {
    const i = rightEquipmentList.findIndex((obj) => obj.id === selectedEquipment.id);
    rightEquipmentList[i].quantity -= selectedDeleteQuantity;
    if(rightEquipmentList[i].quantity <= 0) {
      rightEquipmentList.splice(i, 1);
    }
    toggleDeletePopUp();
  };
  const createEquipmentList = async e => {
    e.preventDefault();
    const res = await setEquipmentLists(id,rightEquipmentList);
    if(res.message == "Pole \"wyposazenie\" zostało zaktualizowane."){
      alert("Edytowano wyposażenie")
      navigate('/konto', { replace: true });
      window.location.reload(false);
    } else {
      alert("Błąd")
    }
} 

  return (
    <body>
      <h1>2. Dobierz wyposażenie do swojego akwarium</h1>
      {isPopupVisible && (
        <div className="popup">
          <h2>Ile wyposażenia chcesz dodać:</h2>
          <div className='UpperPopup'>
            <img src={`images/${selectedEquipment.obraz}`}></img>
          </div>
          <div className='MiddlePopup'>
            <Button onClick={decreaseCounter} className='changeButton'>-</Button>
            <div className='QuantityContainer'><a>{selectedQuantity}</a></div>
            <Button onClick={increaseCounter} className='changeButton'>+</Button>
          </div>
          <div className='LowerPopup'>
            <Button onClick={togglePopUp}>Anuluj</Button>
            <Button onClick={addEquipment}>Dodaj</Button>
          </div>
        </div>
      )}
      {isDeletePopupVisible && (
        <div className="popup">
          <h2>Ile wyposażenia chcesz usunąć:</h2>
          <div className='UpperPopup'>
            <img src={`images/${selectedEquipment.obraz}`}></img>
          </div>
          <div className='MiddlePopup'>
            <Button onClick={decreaseDeleteCounter} className='changeButton'>-</Button>
            <div className='QuantityContainer'><a>{selectedDeleteQuantity}</a></div>
            <Button onClick={increaseDeleteCounter} className='changeButton'>+</Button>
          </div>
          <div className='LowerPopup'>
            <Button onClick={toggleDeletePopUp}>Anuluj</Button>
            <Button onClick={removeEquipment}>Usuń</Button>
          </div>
        </div>
      )}
    <div className='equipmentBody'>
      <div className='equipmentChoiceConatiner'>
        <div className='equipmentChoiceConatinerLeft'>
          <div className="equipmentContainer">
              <h2>Wybierz wyposażenie</h2>
              {currentEquipment.map((item) => (
                  <div className='equipment' key={item.id}>
                      <img className='equipmentImage' src={`images/${item.obraz}`} onClick={ () => {togglePopUp(); setSelectedEquipment(item)}}></img>
                      <h3 className='equipmentName'>{item.nazwa}</h3>
                  </div>
              ))}
          </div>
          <ReactPaginate
                    onPageChange={paginate}
                    pageCount={Math.ceil(equipmentList.length / equipmentPerPage)}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-number'}
                    previousLinkClassName={'prev-navigation-button'}
                    nextLinkClassName={'next-navigation-button'}
                    activeLinkClassName={'active'}
          />
        </div>
        <div className='equipmentChoiceConatinerRight'>
          <div className="equipmentContainer">
              <h2>Twoje wyposażenie</h2>
              {currentRightEquipment.map((item) => (
                  <div className='equipment' key={item.id}>
                      <img className='equipmentImage' src={`images/${item.obraz}`} onClick={ () => {toggleDeletePopUp(); setSelectedEquipment(item)}}></img>
                      <h3 className='equipmentName'>{item.nazwa} x{item.quantity}</h3>
                  </div>
              ))}
          </div>
          {rightEquipmentList.length > 0 ? (
          <ReactPaginate
                    onPageChange={paginateRight}
                    pageCount={Math.ceil(rightEquipmentList.length / equipmentPerRightPage)}
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
    <div className='LastContainer'>
      <Button className='SubmitequipmentTank' onClick={createEquipmentList}>Dodaj wyposażenie</Button>
    </div>
    </body>
  )
}

export default FishTankCreate