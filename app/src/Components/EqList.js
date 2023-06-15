import React from 'react'
import './EqList.css'
import { Link } from 'react-router-dom'

function EqList({ eq, loading }) {
  if(loading){
    return <h1> Wczytywanie... </h1>
  }
  console.log(eq)
  return (
    <div className="EQFishContainer">
        {eq.map((item) => (
            <div className='EQFish' key={item.id}>
                <Link><img className='EQFishImage' src={`images/${item.obraz}`}></img></Link>
                {item.hasOwnProperty('ilosc') ? <h3 className='EQFishName'>{item.nazwa} x {item.ilosc}</h3> : <h3 className='EQFishName'>{item.nazwa}</h3>}
            </div>
        ))}
    </div>
  )
}

export default EqList