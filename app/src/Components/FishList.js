import React from 'react'
import './FishList.css'
import { Link } from 'react-router-dom'

function FishList({ fish, loading }) {
  if(loading){
    return <h1> Wczytywanie... </h1>
  }
  return (
    <div className="FLFishContainer">
        {fish.map((item) => (
            <div className='FLFish' key={item.id}>
                <Link to={`/szczegolyRyby?id=${item.id}`}><img className='FLFishImage' src={`images/${item.obraz}`}></img></Link>
                {item.hasOwnProperty('quantity') ? <h3 className='FLFishName'>{item.gatunek} x{item.quantity}</h3> : <h3 className='FLFishName'>{item.gatunek}</h3>}
            </div>
        ))}
    </div>
  )
}

export default FishList