
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, ShoppingCart } from 'lucide-react';
import { mockCafes, mockOrders, mockMenuItems } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const CafeOwnerDashboard = () => {
  const { user } = useAuth();
  const [orderStatusUpdating, setOrderStatusUpdating] = useState<string | null>(null);
  
  // Find cafe owned by the current user
  const userCafe = mockCafes.find(cafe => cafe.ownerId === user?.id);
  
  // If the cafe is found, filter orders for that cafe
  const cafeOrders = userCafe 
    ? mockOrders.filter(order => order.cafeId === userCafe.id) 
    : [];
  
  // Get menu items for this cafe
  const cafeMenuItems = userCafe 
    ? mockMenuItems.filter(item => item.cafeId === userCafe.id)
    : [];
  
  const totalMenuItems = cafeMenuItems.length;
  const availableMenuItems = cafeMenuItems.filter(item => item.available).length;
  
  const handleStatusUpdate = (orderId: string) => {
    setOrderStatusUpdating(orderId);
    // This would be an API call in a real app
    setTimeout(() => {
      toast.success('Order status updated successfully');
      setOrderStatusUpdating(null);
    }, 1000);
  };

  if (!userCafe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Welcome to University Food Central</h2>
        <p className="text-gray-600 mb-6">You haven't registered your cafe yet.</p>
        <Button asChild className="bg-university-primary hover:bg-university-primary/90">
          <Link to="/dashboard/register-cafe">Register Your Cafe</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title={`Welcome, ${user?.name}`}
        description="Cafe Owner Dashboard"
        action={
          <Button asChild className="bg-university-secondary hover:bg-university-secondary/90">
            <Link to="/dashboard/menu">Manage Menu</Link>
          </Button>
        }
      />

      {/* Cafe Status Card */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Your Cafe: {userCafe.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <p className="text-sm text-gray-500">Status</p>
              <div className="mt-1">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                  ${userCafe.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    userCafe.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                  {userCafe.status.charAt(0).toUpperCase() + userCafe.status.slice(1)}
                </span>
              </div>
              {userCafe.status === 'pending' && (
                <p className="text-sm text-yellow-600 mt-2">
                  Your cafe is awaiting admin approval.
                </p>
              )}
            </div>
            <div className="flex flex-col sm:items-end">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Clock size={16} className="mr-1" />
                <span>{userCafe.openingHours}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={16} className="mr-1" />
                <span>Registered on {new Date(userCafe.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cafeOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              {cafeOrders.filter(o => o.status === 'pending').length} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMenuItems}</div>
            <p className="text-xs text-muted-foreground">
              {availableMenuItems} available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <div className="text-muted-foreground">$</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$120.50</div>
            <p className="text-xs text-muted-foreground">
              +12% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <Link 
          to="/dashboard/orders" 
          className="text-university-secondary hover:text-university-primary flex items-center text-sm"
        >
          View All <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          {cafeOrders.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cafeOrders.map(order => {
                  const orderDate = new Date(order.createdAt);
                  const formattedDate = `${orderDate.toLocaleDateString()} ${orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                  
                  return (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{order.userName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{formattedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">${order.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id)}
                            disabled={orderStatusUpdating === order.id}
                            className="bg-university-primary hover:bg-university-primary/90"
                          >
                            {orderStatusUpdating === order.id ? 'Updating...' : 'Update Status'}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No orders received yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CafeOwnerDashboard;
