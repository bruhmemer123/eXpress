import { Link, useLocation } from 'react-router-dom';

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-[0.1em] text-white transition hover:text-purple-200"
        >
          <img
            src="/djexpress_logo.jpeg"
            alt="DJS eXpress Logo"
            className="h-10 w-10 rounded-2xl object-cover"
          />
          DJS eXpress
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
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
      </div>
    </header>
  );
};

export default Header