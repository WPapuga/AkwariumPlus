import logo from './logo.svg';                    //react logo
import './App.css';                               //basic css
import Button from 'react-bootstrap/Button';      
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <img src="akwarium_logo.png" alt="logo"/>
        <img src={logo} className="App-logo" alt="logo" />
        <Button>Test Button</Button>
      </header>
    </div>
  );
}

export default App;
