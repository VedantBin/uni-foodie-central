
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-university-primary text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-heading text-xl font-bold">UniFood Central</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Desktop navigation */}
        <nav className="hidden sm:flex items-center space-x-6">
          <Link to="/" className="hover:text-university-secondary transition-colors">Home</Link>
          <Link to="/cafes" className="hover:text-university-secondary transition-colors">Cafes</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-university-secondary transition-colors">Dashboard</Link>
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span className="font-medium">{user?.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:text-university-secondary" 
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </>
          ) : (
            <div className="space-x-2">
              <Button 
                variant="ghost" 
                className="hover:bg-white hover:text-university-primary"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="outline" 
                className="bg-university-secondary border-university-secondary hover:bg-university-secondary hover:bg-opacity-90 text-white"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile menu (shown/hidden based on state) */}
        <div className={cn(
          "absolute top-16 left-0 right-0 bg-university-primary z-50 shadow-lg transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}>
          {isMenuOpen && (
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <Link to="/" className="py-2 hover:text-university-secondary transition-colors">Home</Link>
              <Link to="/cafes" className="py-2 hover:text-university-secondary transition-colors">Cafes</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="py-2 hover:text-university-secondary transition-colors">Dashboard</Link>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:text-university-secondary" 
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      <span className="ml-1">Logout</span>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    className="flex-1 hover:bg-white hover:text-university-primary"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-university-secondary border-university-secondary hover:bg-university-secondary hover:bg-opacity-90 text-white"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
