
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import CafeOwnerDashboard from './dashboard/CafeOwnerDashboard';
import UserDashboard from './dashboard/UserDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Render the appropriate dashboard based on user role
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'cafe':
      return <CafeOwnerDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      // This should never happen if routing protection is working correctly
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Error</h2>
          <p>Invalid user role or you are not authorized to view this page.</p>
        </div>
      );
  }
};

export default Dashboard;
