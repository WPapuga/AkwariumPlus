import './App.css';                               //basic css
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import Fishes from './pages/Fishes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';



function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/wyposazenie":
      Component = Equipment;
      break;
    case "/ryby":
      Component = Fishes;
      break;
    case "/logowanie":
      Component = SignIn;
      break;
    case "/rejestracja":
      Component = SignUp;
      break;
    default:
      Component = App;
  }
  return (
    <Component />
  );
}

export default App;
