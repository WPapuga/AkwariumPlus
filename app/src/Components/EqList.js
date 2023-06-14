import React from 'react'
import './EqList.css'
import { Link } from 'react-router-dom'

function EqList({ eq, loading }) {
  if(loading){
    return <h1> Wczytywanie... </h1>
  }
  return (
    <div className="EQFishContainer">
        {eq.map((item) => (
            <div className='EQFish' key={item.id}>
                <Link><img className='EQFishImage' src={`images/${item.obraz}`}></img></Link>
                {item.hasOwnProperty('quantity') ? <h3 className='EQFishName'>{item.nazwa} x{item.quantity}</h3> : <h3 className='EQFishName'>{item.nazwa}</h3>}
            </div>
        ))}
    </div>
  )
}

export default EqList