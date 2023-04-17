import React from 'react';
import Button from 'react-bootstrap/Button'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

function Navbar() {
  return (
    <div className="Navbar">
        <div className="NavLeftSide">
            <img src="akwarium_logo.png" alt="logo"/>
            <a>AKWARIUM+</a>
        </div>
        <div className="NavLinks">
            <a href="/">Strona Główna</a>
            <a href="/wyposazenie">Wyposażenie</a>
            <a href="/ryby">Ryby</a>
        </div>
        <div className="NavSigning">
            <a href="/logowanie">Zaloguj</a>
            <a href="/rejestracja">
              <Button className="SignUpButton">Dołącz</Button>
            </a>
        </div>
    </div>
  )
}

export default Navbar