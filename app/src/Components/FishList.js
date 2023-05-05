import React from 'react'
import './FishList.css'

function FishList({ fish, loading }) {
  if(loading){
    return <h1> Wczytywanie... </h1>
  }
  return (
    <div className="FishContainer">
        {fish.map((item) => (
            <div className='Fish' key={item.id}>
                <img className='FishImage' src={`images/${item.image}`}></img>
                <h3 className='FishName'>{item.name}</h3>
            </div>
        ))}
    </div>
  )
}

export default FishList