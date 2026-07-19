import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Mic, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Expresso', path: '/expresso' },
  { label: 'Team', path: '/team' },
  { label: 'Articles', path: '/articles' },
  { label: 'Previous Events', path: '/previous-events' },
  { label: 'Contact', path: '/contact' },
];

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`z-50 transition-all duration-300 ${
        isHomePage
          ? 'fixed top-0 inset-x-0 border-none bg-transparent shadow-none backdrop-blur-none outline-none'
          : 'sticky top-0 border-b border-white/10 bg-black shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold tracking-[0.1em] text-white transition hover:text-purple-200"
        >
          <img
            src="/djexpress_logo.jpeg"
            alt="DJS eXpress Logo"
            className="h-10 w-10 rounded-2xl object-cover"
          />
          <span>DJSCE e<span className=" p-0 text-purple-400">X</span>press</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 text-base font-medium md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-3 py-2 transition duration-200 ${
                  isActive
                    ? 'text-purple-400 font-semibold'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-purple-400 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Mic size={24} />}
        </button>
      </div>

      {/* Mobile Navigation with Smooth Transition */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 bg-slate-950/95 backdrop-blur-xl border-l border-white/10 flex flex-col pt-6 px-6 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden z-40`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="self-end mb-6 text-white hover:text-purple-400 transition"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <nav className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/' ? location.pathname === '/' : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-right text-lg font-medium transition duration-200 ${
                  isActive
                    ? 'text-purple-400 font-semibold'
                    : 'text-slate-300 hover:text-purple-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden z-30 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Header