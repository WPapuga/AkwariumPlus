import logo from '../logo.svg';                    //react logo
import Button from 'react-bootstrap/Button';      


export default function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src="akwarium_background.png" alt="background" style={{width: "100%", height: "auto"}}/>
                <p>"Twoje akwarium, Twoja oaza spokoju - z nami możesz mieć pewność, że zawsze będzie w doskonałym stanie!"</p>
                <img src="akwarium_logo.png" alt="logo"/>
                <img src={logo} className="App-logo" alt="logo" />
                <Button>Test Button</Button>
            </header>
            <body className="App-body">
                <p>Ryby</p>
            </body>
        </div>
    );
}