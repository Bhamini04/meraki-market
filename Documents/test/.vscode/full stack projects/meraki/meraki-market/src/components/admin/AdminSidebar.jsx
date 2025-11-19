import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, List, Users, ShoppingBag, BarChart2, LogOut } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { toast } from '@/components/ui/use-toast';

const adminNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Products', icon: Package, path: '/admin/products' },
  { name: 'Categories', icon: List, path: '/admin/categories' },
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
  { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    toast({ description: "Admin logged out."});
    navigate('/admin/login');
  };

  return (
    <motion.aside
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-purple-500/20 shadow-lg p-6 flex flex-col justify-between"
    >
      <div>
        <Link to="/admin/dashboard" className="flex items-center justify-center mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 bg-clip-text text-transparent"
          >
            Admin Panel
          </motion.div>
        </Link>

        <nav className="space-y-4">
          {adminNavItems.map((item) => (
            <Link key={item.name} to={item.path}>
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-white shadow-md border border-pink-500/40'
                    : 'text-gray-300 hover:bg-slate-800/50 hover:text-pink-400'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.02, x: 5 }}
        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-200"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </motion.button>
    </motion.aside>
  );
};

export default AdminSidebar;