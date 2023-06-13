import React from 'react';
import Button from 'react-bootstrap/Button'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Greeting(props) {
    const navigate = useNavigate();
    const isLoggedIn = props.isLoggedIn;
    const handleLogout = () => {
      toast.success('Wylogowano pomyślnie!');
      setTimeout(function(){  sessionStorage.setItem('isLogged', false);
                              navigate('/', { replace: true }); }, 5000);
    };
    return ( 
        <div className="Navbar">
        <div className="NavLeftSide">
            <img src="images/akwarium_logo.png" alt="logo"/>
            <Link to="/">AKWARIUM+</Link>
        </div>
        <div className="NavLinks">
            <CustomLink to="/">Strona Główna</CustomLink>
            <CustomLink to="/wyposazenie">Wyposażenie</CustomLink>
            <CustomLink to="/ryby">Ryby</CustomLink>
            {sessionStorage.getItem('isLogged') == "true" ? <CustomLink to="/konto">Moje Akwaria</CustomLink> : <div></div>}
        </div>
        <div className="NavSigning">
            {sessionStorage.getItem('isLogged') == "true" ? 
                <a href="#" onClick={handleLogout}>Wyloguj</a>
                :
                <>
                <CustomLink to="/logowanie">Zaloguj</CustomLink>
                <CustomLink to="/rejestracja">
                    <Button className="SignUpButton">Dołącz</Button>
                </CustomLink>
                </>
            }
        </div>
        <ToastContainer />
        </div>
    );
}

function Navbar() {
  return (
    <Greeting isLoggedIn={true} />
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