
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
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
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-university-primary hover:bg-university-primary/90"
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
              >
                Admin Demo
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoUser('cafe')}
              >
                Cafe Demo
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => loginAsDemoUser('user')}
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
