import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Account.css'


function usunAkwarium(id) {
    fetch('http://localhost:3030/deleteFishTank?id='+id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    console.log(id);
    window.location.reload();
}

function Account() {
  const [fishList, setFishList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
      setLoading(true);
      console.log(sessionStorage.getItem("userId"));
      fetch('http://localhost:3030/getFishTank?id='+sessionStorage.getItem("id"))
        .then(response => response.json())
        .then(data => {
          setFishList(data);
          console.log(data);
          setLoading(false);
        });
  }, []);


  return (
    <body>
      <div className='ButtonContainer'>
        <Link to={`/tworzenie`}>
          <button>Dodaj nowe akwarium</button>
        </Link>
      </div>
      <div className='FishTankListContainer'>
        <h1>Twoje akwaria</h1>
        {
          loading ? <h1> Wczytywanie... </h1>
          :
          <div className="FishTankContainer">
            {fishList.map((item) => (
              <div className='FishTank' key={item.id}>
                  <div className='FishTankButtonContainer'>
                    <Link to={`/szczegolyAkwarium?id=${item.id}`}>
                      <button>Zobacz Szczegóły</button>
                    </Link>
                  </div>
                  <div className='FishTankNameContainer'>
                    <h3 className='FishTankName'>{item.nazwa}</h3>
                  </div>
                  <div className='FishTankButtonContainerDelete'>
                          <button onClick={() => usunAkwarium(item.id)}>Usuń akwarium</button>
                  </div>
              </div>
            ))}
          </div>
        }
      </div>
    </body>
  )
}


export default Account