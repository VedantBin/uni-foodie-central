
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/navigation/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCafes } from '@/data/mockData';
import { Search } from 'lucide-react';

const CafesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter approved cafes and apply search term
  const filteredCafes = mockCafes
    .filter(cafe => cafe.status === 'approved')
    .filter(cafe => 
      cafe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cafe.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-slide-in">
          <h1 className="text-4xl font-bold mb-2">Campus Food Spots</h1>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Discover and order from university cafes and restaurants.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-12 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <Input
            type="text"
            placeholder="Search cafes by name, description or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md w-full shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        
        {/* Cafes Grid */}
        {filteredCafes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCafes.map((cafe, index) => (
              <div 
                key={cafe.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md card-hover animate-fade-in"
                style={{animationDelay: `${0.1 + index * 0.05}s`}}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={cafe.image} 
                    alt={cafe.name} 
                    className="w-full h-48 object-cover transform transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{cafe.name}</h2>
                  <p className="text-gray-600 mb-4">{cafe.description}</p>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p>{cafe.location}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Hours</h3>
                    <p>{cafe.openingHours}</p>
                  </div>
                  <Button 
                    asChild 
                    className="w-full bg-university-primary hover:bg-university-primary/90 transform transition-transform hover:scale-105"
                  >
                    <Link to={`/cafes/${cafe.id}`}>View Menu</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade-in bg-white rounded-xl shadow-md mx-auto max-w-md">
            <h2 className="text-xl font-semibold mb-2">No cafes found</h2>
            <p className="text-gray-500">Try adjusting your search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CafesList;
