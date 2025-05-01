
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/navigation/NavBar';
import { mockCafes } from '@/data/mockData';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-university-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-university-primary to-university-primary/80 z-0"></div>
        <div className="container mx-auto px-4 flex flex-col items-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 animate-bounce-in">
            University Food Central
          </h1>
          <p className="text-xl text-center max-w-2xl mb-8 animate-slide-in">
            Discover, order, and enjoy the best food options across campus.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{animationDelay: "0.3s"}}>
            <Button 
              asChild
              className="bg-university-secondary hover:bg-university-secondary/90 text-white transform transition-transform hover:scale-105"
              size="lg"
            >
              <Link to="/cafes">Browse Cafes</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-university-primary transform transition-transform hover:scale-105"
              size="lg"
            >
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Cafes Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-slide-in">Featured Campus Spots</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCafes
              .filter(cafe => cafe.status === 'approved')
              .slice(0, 3)
              .map((cafe, index) => (
                <div key={cafe.id} className="bg-white rounded-xl overflow-hidden shadow-md card-hover" 
                     style={{animationDelay: `${index * 0.1}s`}}>
                  <img src={cafe.image} alt={cafe.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{cafe.name}</h3>
                    <p className="text-gray-600 mb-4">{cafe.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{cafe.location}</p>
                    <Button asChild className="w-full bg-university-primary hover:bg-university-primary/90 transform transition-transform hover:scale-105">
                      <Link to={`/cafes/${cafe.id}`}>View Menu</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="text-center mt-10 animate-fade-in" style={{animationDelay: "0.5s"}}>
            <Button asChild variant="outline" className="border-university-primary text-university-primary hover:bg-university-primary hover:text-white transform transition-transform hover:scale-105">
              <Link to="/cafes">View All Campus Spots</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-slide-in">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl bg-white rounded-xl shadow-md animate-fade-in" style={{animationDelay: "0.2s"}}>
              <div className="bg-university-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Browse Food Spots</h3>
              <p className="text-gray-600">
                Explore all the food options available across campus.
              </p>
            </div>
            
            <div className="text-center p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl bg-white rounded-xl shadow-md animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="bg-university-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Place Your Order</h3>
              <p className="text-gray-600">
                Select your favorite items and place an order in just a few clicks.
              </p>
            </div>
            
            <div className="text-center p-6 transform transition-all hover:-translate-y-2 hover:shadow-xl bg-white rounded-xl shadow-md animate-fade-in" style={{animationDelay: "0.6s"}}>
              <div className="bg-university-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Pick Up & Enjoy</h3>
              <p className="text-gray-600">
                Skip the line and pick up your order when it's ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up CTA */}
      <section className="py-16 bg-university-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-slide-in">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
            Join the campus food community and enjoy convenient ordering from all food spots.
          </p>
          <Button asChild size="lg" className="bg-white text-university-secondary hover:bg-gray-100 transform transition-transform hover:scale-105 animate-bounce-in" style={{animationDelay: "0.4s"}}>
            <Link to="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">University Food Central</h3>
              <p className="text-gray-300">
                The easiest way to discover and order from campus food spots.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/cafes" className="text-gray-300 hover:text-white transition-colors">Campus Food Spots</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="text-gray-300 not-italic">
                University Campus<br />
                123 University Avenue<br />
                Email: support@unifoodcentral.edu
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} University Food Central. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
