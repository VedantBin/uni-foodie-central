
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from '@/components/navigation/NavBar';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { Home, Coffee, ShoppingCart, Users, Settings, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const DashboardLayout = () => {
  const { user, isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Define sidebar menu items based on user role
  let menuItems;

  switch (user?.role) {
    case 'admin':
      menuItems = [
        { icon: Home, label: 'Overview', link: '/dashboard' },
        { icon: Coffee, label: 'Manage Cafes', link: '/dashboard/cafes' },
        { icon: ShoppingCart, label: 'All Orders', link: '/dashboard/orders' },
        { icon: Users, label: 'Users', link: '/dashboard/users' },
        { icon: Settings, label: 'Settings', link: '/dashboard/settings' },
      ];
      break;
    case 'cafe':
      menuItems = [
        { icon: Home, label: 'Overview', link: '/dashboard' },
        { icon: List, label: 'Menu Management', link: '/dashboard/menu' },
        { icon: ShoppingCart, label: 'Orders', link: '/dashboard/orders' },
        { icon: Settings, label: 'Settings', link: '/dashboard/settings' },
      ];
      break;
    default:
      menuItems = [
        { icon: Home, label: 'My Dashboard', link: '/dashboard' },
        { icon: ShoppingCart, label: 'Order History', link: '/dashboard/orders' },
        { icon: Settings, label: 'Account Settings', link: '/dashboard/settings' },
      ];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <SidebarProvider>
        <div className="flex min-h-[calc(100vh-4rem)]">
          <Sidebar className="border-r h-[calc(100vh-4rem)]">
            <SidebarContent className="py-2">
              <div className="mb-2 px-3 flex justify-between items-center">
                <h2 className={cn("font-semibold", collapsed ? "sr-only" : "")}>
                  {user?.role === 'admin' ? 'Admin Panel' : 
                   user?.role === 'cafe' ? 'Cafe Management' : 
                   'User Dashboard'}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCollapsed(!collapsed)}
                  className="text-gray-500"
                >
                  {collapsed ? "→" : "←"}
                </Button>
              </div>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.link}>
                        <SidebarMenuButton asChild>
                          <a href={item.link} className="flex items-center space-x-2">
                            <item.icon className="flex-shrink-0" size={18} />
                            {!collapsed && <span>{item.label}</span>}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className={cn("flex-1 p-6", collapsed ? "ml-16" : "")}>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
