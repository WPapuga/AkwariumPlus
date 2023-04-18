import React from 'react';
import Button from 'react-bootstrap/Button'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";


function Navbar() {
  return (
    <div className="Navbar">
        <div className="NavLeftSide">
            <img src="akwarium_logo.png" alt="logo"/>
            <Link>AKWARIUM+</Link>
        </div>
        <div className="NavLinks">
            <CustomLink to="/">Strona Główna</CustomLink>
            <CustomLink to="/wyposazenie">Wyposażenie</CustomLink>
            <CustomLink to="/ryby">Ryby</CustomLink>
        </div>
        <div className="NavSigning">
            <CustomLink to="/logowanie">Zaloguj</CustomLink>
            <Link to="/rejestracja">
              <Button className="SignUpButton">Dołącz</Button>
            </Link>
        </div>
    </div>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <div className={isActive ? "active" : ""}>
          <Link to={to} {...props}>{children}</Link>
    </div>
  )
}

export default Navbar