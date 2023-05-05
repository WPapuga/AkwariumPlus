import logo from '../logo.svg';                    //react logo
import Button from 'react-bootstrap/Button';      
import BenefitsDescription from '../Components/BenefitsDescription';
import Carousel from '../Components/Carousel';
import './Home.css';
export default function Home() {
    return (
        <div className="App " >
            <header className="App-header">
                <Carousel/>
                <BenefitsDescription/>
            </header>
        </div>
    );
}