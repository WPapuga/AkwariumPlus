import React from 'react';
import Button from 'react-bootstrap/Button';      
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

function Navbar() {
  return (
    <div className="Navbar">
        <div className="NavLeftSide">
            <img src="akwarium_logo.png" alt="logo"/>
            <a>Akwarium+</a>
        </div>
        <div className="NavLinks">
            <a>Strona Główna</a>
            <a>Wyposażenie</a>
            <a>Ryby</a>
        </div>
        <div className="NavSigning">
            <a>Zaloguj</a>
            <Button className="SignUpButton">Dołącz</Button>

        </div>
    </div>
  )
}

export default Navbar