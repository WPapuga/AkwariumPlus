import './App.css';                               //basic css
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import Fishes from './pages/Fishes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import FishDetails from './pages/FishDetails';
import Footer from "./Components/Footer";
import FishTankDetails from "./pages/FishTankDetails";
import FishTankCreate from "./pages/FishTankCreate";
import FishTankEdit from "./pages/FishTankEdit";
import EditWater from "./pages/EditWater";
import EditFish from "./pages/EditFish";
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/wyposazenie" element={ <Equipment/> } />
        <Route path="/ryby" element={ <Fishes/> } />
        <Route path="/konto" element={ <Account/> } />
        <Route path="/logowanie" element={ <SignIn/> } />
        <Route path="/rejestracja" element={ <SignUp/> } />
        <Route path="/szczegolyRyby" element={ <FishDetails/> } />
        <Route path="/szczegolyAkwarium" element={ <FishTankDetails/> } />
        <Route path="/edycjaAkwarium" element={ <FishTankEdit/> } />
        <Route path="/tworzenie" element={ <FishTankCreate/> } />
        <Route path="/dodajwode" element={ <EditWater/> } />
        <Route path="/dodajryby" element={ <EditFish/> } />



      </Routes>
        <Footer />
    </>
  );
}

export default App;
