import Button from 'react-bootstrap/Button';      
import Navbar from '../Components/Navbar';


export default function Fishes() {
    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
                <p>Ryby</p>
                <img src="akwarium_logo.png" alt="logo"/>
                <Button>Przycisk</Button>
            </header>
        </div>
    );
}