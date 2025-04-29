import './App.css';
import './fonts.css';

import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Nav from './components/Nav';

function App() {

  return (
    <div className="content-container">
        <Hero />
        <AboutMe />
        <Nav />
    </div>
  );
}

export default App;
