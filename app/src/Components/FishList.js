import React from 'react'
import './FishList.css'
import { Link } from 'react-router-dom'

function FishList({ fish, loading }) {
  if(loading){
    return <h1> Wczytywanie... </h1>
  }
  return (
    <div className="FishContainer">
        {fish.map((item) => (
            <div className='Fish' key={item.id}>
                <Link to={`/szczegolyRyby?id=${item.id}`}><img className='FishImage' src={`images/${item.image}`}></img></Link>
                <h3 className='FishName'>{item.name}</h3>
            </div>
        ))}
    </div>
  )
}

export default FishList