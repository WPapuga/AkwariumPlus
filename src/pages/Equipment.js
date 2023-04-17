import Button from 'react-bootstrap/Button';      
import Navbar from '../Components/Navbar';


export default function Equipment() {
    return (
        <div className="App">
            <Navbar />
            <header className="App-header">
                <p>Wyposażenie Akwarium</p>
                <img src="akwarium_logo.png" alt="logo"/>
                <Button>Przycisk</Button>
            </header>
        </div>
    );
}