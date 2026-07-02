import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Expresso from './pages/Expresso';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import Previous_Events from './pages/Previous_Events';
import './index.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="flex-grow pt-0 md:pt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/expresso" element={<Expresso />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/previous-events" element={<Previous_Events />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}