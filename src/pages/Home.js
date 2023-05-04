import logo from '../logo.svg';                    //react logo
import Button from 'react-bootstrap/Button';      
import BenefitsDescription from '../Components/BenefitsDescription';

export default function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src="images/akwarium_background.png" alt="background" style={{width: "100%", height: "auto"}}/>
                <BenefitsDescription/>
                <h1 class="mb-4">Nasze motto to</h1>
                <p>"Twoje akwarium, Twoja oaza spokoju - z nami możesz mieć pewność, że zawsze będzie w doskonałym stanie!"</p>
                <img src="images/akwarium_logo.png" alt="logo" class="mb-4"/>
            </header>
        </div>
    );
}