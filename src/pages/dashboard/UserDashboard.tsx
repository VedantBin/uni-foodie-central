
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Coffee, ShoppingCart } from 'lucide-react';
import { mockCafes, mockOrders } from '@/data/mockData';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useAuth();
  
  // Filter orders for the current user
  const userOrders = user ? mockOrders.filter(order => order.userId === user.id) : [];
  
  // Get the approved cafes
  const approvedCafes = mockCafes.filter(cafe => cafe.status === 'approved');
  
  // Calculate some stats
  const totalOrders = userOrders.length;
  const completedOrders = userOrders.filter(order => order.status === 'completed').length;
  const pendingOrders = userOrders.filter(order => 
    ['pending', 'preparing', 'ready'].includes(order.status)).length;

  return (
    <div>
      <PageHeader 
        title={`Welcome, ${user?.name}`}
        description="Student/Staff Dashboard"
        action={
          <Button asChild className="bg-university-secondary hover:bg-university-secondary/90">
            <Link to="/cafes">Order Food</Link>
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Your Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {pendingOrders} pending, {completedOrders} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Campus Cafes</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedCafes.length}</div>
            <p className="text-xs text-muted-foreground">
              Available on campus
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Special Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Student Union Cafe</div>
            <p className="text-xs text-muted-foreground">
              Extended hours: 7 AM - 10 PM
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Active Orders</h2>
        
        {userOrders.filter(order => ['pending', 'preparing', 'ready'].includes(order.status)).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userOrders
              .filter(order => ['pending', 'preparing', 'ready'].includes(order.status))
              .map(order => {
                const cafe = mockCafes.find(c => c.id === order.cafeId);
                
                return (
                  <Card key={order.id} className="overflow-hidden">
                    <div className="bg-university-primary text-white p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{cafe?.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full 
                          ${order.status === 'ready' ? 'bg-green-500' : 
                            order.status === 'preparing' ? 'bg-blue-500' : 
                            'bg-yellow-500'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500">Order Items</h4>
                        <ul className="mt-2 space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>{item.quantity}x {item.name}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="mt-4 text-center">
                        <Button asChild className="w-full bg-university-primary hover:bg-university-primary/90">
                          <Link to={`/dashboard/orders/${order.id}`}>View Order Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 mb-4">You don't have any active orders.</p>
              <Button asChild className="bg-university-primary hover:bg-university-primary/90">
                <Link to="/cafes">Browse Cafes</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Orders */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        <Link 
          to="/dashboard/orders" 
          className="text-university-secondary hover:text-university-primary flex items-center text-sm"
        >
          View All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        {completedOrders > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cafe</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userOrders
                  .filter(order => order.status === 'completed')
                  .map(order => {
                    const orderDate = new Date(order.createdAt);
                    const formattedDate = `${orderDate.toLocaleDateString()} ${orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                    
                    return (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{order.cafeName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{formattedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">${order.totalAmount.toFixed(2)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No order history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
