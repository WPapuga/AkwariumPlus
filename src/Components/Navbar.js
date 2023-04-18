import React from 'react';
import Button from 'react-bootstrap/Button'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div className="Navbar">
        <div className="NavLeftSide">
            <img src="akwarium_logo.png" alt="logo"/>
            <Link>AKWARIUM+</Link>
        </div>
        <div className="NavLinks">
            <Link to="/">Strona Główna</Link>
            <Link to="/wyposazenie">Wyposażenie</Link>
            <Link to="/ryby">Ryby</Link>
        </div>
        <div className="NavSigning">
            <Link to="/logowanie">Zaloguj</Link>
            <Link to="/rejestracja">
              <Button className="SignUpButton">Dołącz</Button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar