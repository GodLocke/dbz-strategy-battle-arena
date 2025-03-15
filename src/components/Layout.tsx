
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout = ({ children, showHeader = true, showFooter = true }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-dbz-blue/10 to-dbz-orange/10">
      {showHeader && (
        <header className="w-full bg-white/95 backdrop-blur-sm shadow-md z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-dbz-orange flex items-center justify-center">
                <span className="text-white font-bold text-lg">DB</span>
              </div>
              <h1 className="game-title text-2xl">Dragon Ball Strategy Arena</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-dbz-darkblue hover:text-dbz-orange transition-colors">Home</Link>
              <Link to="/characters" className="text-dbz-darkblue hover:text-dbz-orange transition-colors">Characters</Link>
              <Link to="/battle" className="text-dbz-darkblue hover:text-dbz-orange transition-colors">Battle</Link>
              <Link to="/rankings" className="text-dbz-darkblue hover:text-dbz-orange transition-colors">Rankings</Link>
            </nav>
            <div className="md:hidden">
              {/* Mobile menu button would go here */}
              <button className="text-dbz-darkblue">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow">{children}</main>

      {showFooter && (
        <footer className="w-full bg-white/95 backdrop-blur-sm shadow-inner">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-dbz-darkgray">
                &copy; {new Date().getFullYear()} Dragon Ball Strategy Arena
              </p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="text-dbz-darkgray hover:text-dbz-orange transition-colors">Terms</a>
                <a href="#" className="text-dbz-darkgray hover:text-dbz-orange transition-colors">Privacy</a>
                <a href="#" className="text-dbz-darkgray hover:text-dbz-orange transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
