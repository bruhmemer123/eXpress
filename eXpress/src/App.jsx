import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import BackToTopButton from './components/BackToTopButton';
import Home from './pages/Home';
import About from './pages/About';
import Expresso from './pages/Expresso';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import Previous_Events from './pages/Previous_Events';
import Starfield from './components/Starfield';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen text-white">
        <div className="flex flex-col min-h-screen text-white">
          {!isHomePage && <Starfield />}
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
          <BackToTopButton />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
