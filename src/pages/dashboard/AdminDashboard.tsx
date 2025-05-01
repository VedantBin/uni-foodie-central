
import PageHeader from '@/components/ui/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockCafes, mockOrders } from '@/data/mockData';
import { ArrowRight, Coffee, ShoppingCart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const pendingCafes = mockCafes.filter(cafe => cafe.status === 'pending').length;
  const totalCafes = mockCafes.length;
  const totalOrders = mockOrders.length;
  
  // The admin dashboard overview includes key metrics and quick actions

  return (
    <div>
      <PageHeader 
        title={`Welcome, ${user?.name}`}
        description="Admin Dashboard Overview"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Cafes</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCafes}</div>
            <p className="text-xs text-muted-foreground">
              {pendingCafes} pending approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              Across all cafes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              3 cafe owners, 7 customers
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Pending Approvals Section */}
      <h2 className="text-xl font-semibold mb-4">Pending Cafe Approvals</h2>
      
      <div className="bg-white rounded-lg shadow mb-8">
        {pendingCafes > 0 ? (
          <div className="divide-y">
            {mockCafes
              .filter(cafe => cafe.status === 'pending')
              .map(cafe => (
                <div key={cafe.id} className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{cafe.name}</h3>
                    <p className="text-sm text-gray-600">{cafe.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No pending cafe approvals at this time.
          </div>
        )}
      </div>
      
      {/* Recent Orders Section */}
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cafe</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOrders.slice(0, 5).map(order => {
                const orderDate = new Date(order.createdAt);
                const formattedDate = `${orderDate.toLocaleDateString()} ${orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                
                return (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.cafeName}</td>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
