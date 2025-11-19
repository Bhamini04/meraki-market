import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings } from 'lucide-react';

const AdminHeader = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20 p-6 flex justify-between items-center"
    >
      <h1 className="text-3xl font-bold text-white">
        Welcome, <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Admin</span>
      </h1>
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full text-gray-300 hover:bg-slate-800/50 hover:text-pink-400 transition-colors"
        >
          <Bell className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full text-gray-300 hover:bg-slate-800/50 hover:text-teal-400 transition-colors"
        >
          <Settings className="w-6 h-6" />
        </motion.button>
        {/* Admin Avatar can be added here */}
      </div>
    </motion.header>
  );
};

export default AdminHeader;