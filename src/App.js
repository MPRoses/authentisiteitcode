import './App.css';
import './fonts.css';

import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Nav from './components/Nav';
import Helpgebieden from "./components/Helpgebieden";
import Ondersteuningsvormen from "./components/Ondersteuningsvormen";

function App() {

  return (
    <div className="content-container">
        <Hero />
        <AboutMe />
        <Nav />
        <Helpgebieden />
        <Ondersteuningsvormen />
    </div>
  );
}

export default App;
