
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Prefilled login details for demo
  const loginAsDemoUser = (role) => {
    let demoEmail = '';
    let demoPassword = '';
    
    switch (role) {
      case 'admin':
        demoEmail = 'admin@university.edu';
        demoPassword = 'admin123';
        break;
      case 'cafe':
        demoEmail = 'cafe@university.edu';
        demoPassword = 'cafe123';
        break;
      case 'user':
        demoEmail = 'user@university.edu';
        demoPassword = 'user123';
        break;
    }
    
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md animate-scale-in shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-university-primary rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-university-primary">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-university-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all focus:ring-2 focus:ring-university-primary"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-university-primary hover:bg-university-primary/90 transform transition-transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm mb-2">Demo logins:</p>
            <div className="flex gap-2 flex-wrap justify-center">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoUser('admin')}
                className="hover:bg-university-primary hover:text-white transition-colors"
              >
                Admin Demo
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoUser('cafe')}
                className="hover:bg-university-primary hover:text-white transition-colors"
              >
                Cafe Demo
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoUser('user')}
                className="hover:bg-university-primary hover:text-white transition-colors"
              >
                User Demo
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-university-secondary font-medium hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
