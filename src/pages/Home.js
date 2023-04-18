import logo from '../logo.svg';                    //react logo
import Button from 'react-bootstrap/Button';      


export default function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src="akwarium_background.png" alt="background" style={{width: "100%", height: "auto"}}/>
                <img src="akwarium_logo.png" alt="logo"/>
                <img src={logo} className="App-logo" alt="logo" />
                <Button>Test Button</Button>
            </header>
        </div>
    );
}