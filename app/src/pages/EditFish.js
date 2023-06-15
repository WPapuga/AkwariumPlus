import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import ReactPaginate from 'react-paginate'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';import './FishTankEdit.css'

async function postFish(details) {
  console.log(details);
  return fetch("http://localhost:3030/postFish", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(details)
}).then(data => data.json())
}

function EditFish() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const [boolSend,setBoolSend] = useState('')
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

    const createFish = async e => {
      e.preventDefault();
      const fishTrans = [];
      rightFishList.map((fish)=>{
          fishTrans.push({
              idgatunku: fish.id,
              ilosc: fish.quantity
          })
      })
      const res = await postFish({
        id: id,
        fishes: JSON.stringify(fishTrans)
      });
      if(res.message == "Sukces"){
        toast.success('Zaktualiowano akwarium');
        setTimeout(function(){ navigate(`/szczegolyAkwarium?id=${id}`, { replace: true }); }, 3000);
      } else {
        toast.error('Błąd');
      }
  }
    useEffect(() => {
      setLoading(true);
      fetch('http://localhost:3030/getFish')
        .then(response => response.json())
        .then(d => {
          setFishList(d);
          console.log(fishList)
          setLoading(false);
        })
    }, []);

    useEffect(() => {
      setLoading(true);
      fetch('http://localhost:3030/getFishFromFishTank?id='+id)
      .then(res => res.json())
      .then(data => {
        let list = []
        for(let i = 0; i < data.length; i++) {
          let selected = fishList.find((obj) => obj.id === data[i].idgatunku);
          let newFish = {
            id: data[i].idgatunku,
            gatunek: selected.gatunek,
            obraz: selected.obraz,
            quantity: data[i].ilosc
          }
          list.push(newFish)
        }
        setRightFishList(list);
        setLoading(false);
      })
    }, [fishList]);

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
      console.log(selectedFish)
      console.log(rightFishList)
      let selected = rightFishList.find((obj) => obj.id === selectedFish.id);

      const i = rightFishList.findIndex((obj) => obj.id === selectedFish.id);
      console.log(selected)
      if (i !== -1) {
        rightFishList[i].quantity += selectedQuantity;
        setRightFishList([...rightFishList]);
        togglePopUp();
      } else {
        let newFish = {
          id: selectedFish.id,
          gatunek: selectedFish.gatunek,
          obraz: selectedFish.obraz,
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
    <h1>Zmień ilość ryb</h1>
      {isPopupVisible && (
        <div className="popup">
          <h2>Ile ryb chcesz dodać:</h2>
          <div className='UpperPopup'>
            <img src={`images/${selectedFish.obraz}`}></img>
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
            <img src={`images/${selectedFish.obraz}`}></img>
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
                      <img className='FishImage' src={`images/${item.obraz}`} onClick={ () => {togglePopUp(); setSelectedFish(item)}}></img>
                      <h3 className='FishName'>{item.gatunek}</h3>
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
                      <img className='FishImage' src={`images/${item.obraz}`} onClick={ () => {toggleDeletePopUp(); setSelectedFish(item)}}></img>
                      <h3 className='FishName'>{item.gatunek} x{item.quantity}</h3>
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
    <div className='LastContainer'>
        <Button className='SubmitFishTank' onClick={createFish}>Dodaj</Button>
    </div>
    </body>
  )
}

export default EditFish