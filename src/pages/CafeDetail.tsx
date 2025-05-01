
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/navigation/NavBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockCafes, mockMenuItems } from '@/data/mockData';
import { ArrowLeft, Clock, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const CafeDetail = () => {
  const { cafeId } = useParams<{ cafeId: string }>();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
  
  // Find the cafe
  const cafe = mockCafes.find(c => c.id === cafeId);
  
  if (!cafe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Cafe Not Found</h1>
          <p className="mb-6">The cafe you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-university-primary hover:bg-university-primary/90">
            <Link to="/cafes">Back to All Cafes</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Get menu items for this cafe and filter by search term
  const menuItems = mockMenuItems
    .filter(item => item.cafeId === cafeId)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  // Group menu items by category
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  
  const getItemQuantity = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };
  
  const addToCart = (itemId: string) => {
    setCart(currentCart => {
      const exists = currentCart.find(item => item.id === itemId);
      if (exists) {
        return currentCart.map(item => 
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { id: itemId, quantity: 1 }];
    });
  };
  
  const decreaseQuantity = (itemId: string) => {
    setCart(currentCart => {
      const exists = currentCart.find(item => item.id === itemId);
      if (exists && exists.quantity === 1) {
        return currentCart.filter(item => item.id !== itemId);
      }
      return currentCart.map(item => 
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };
  
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  
  const placeOrder = () => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      return;
    }
    
    if (getTotalItems() === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    toast.success('Order placed successfully!');
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link to="/cafes" className="flex items-center text-university-secondary hover:text-university-primary mb-4">
            <ArrowLeft size={16} className="mr-1" />
            Back to Cafes
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{cafe.name}</h1>
              <p className="text-gray-600 mt-1">{cafe.description}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center mt-3 sm:space-x-6">
                <div className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
                  <MapPin size={16} className="mr-1" />
                  <span>{cafe.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span>{cafe.openingHours}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              {getTotalItems() > 0 && (
                <Button 
                  className="bg-university-secondary hover:bg-university-secondary/90 flex items-center"
                  onClick={placeOrder}
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Order Now ({getTotalItems()})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Menu Search */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        {/* Menu Categories */}
        {categories.length > 0 ? (
          categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-university-primary">{category}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuItems
                  .filter(item => item.category === category)
                  .map(item => {
                    const itemQuantity = getItemQuantity(item.id);
                    
                    return (
                      <div key={item.id} className="flex bg-white p-4 rounded-lg shadow-sm">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <span className="font-bold">${item.price.toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          
                          <div className="flex justify-end mt-2">
                            {itemQuantity === 0 ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addToCart(item.id)}
                                className="text-university-primary border-university-primary hover:bg-university-primary hover:text-white"
                              >
                                <Plus size={16} className="mr-1" />
                                Add
                              </Button>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="p-1 h-8 w-8"
                                >
                                  <Minus size={16} />
                                </Button>
                                <span className="font-medium w-6 text-center">{itemQuantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addToCart(item.id)}
                                  className="p-1 h-8 w-8"
                                >
                                  <Plus size={16} />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No menu items found</h2>
            <p className="text-gray-500">Try adjusting your search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CafeDetail;
