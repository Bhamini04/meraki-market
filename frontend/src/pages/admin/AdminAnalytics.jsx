import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, users: 24 },
  { name: 'Feb', revenue: 3000, users: 13 },
  { name: 'Mar', revenue: 2000, users: 98 },
  { name: 'Apr', revenue: 2780, users: 39 },
  { name: 'May', revenue: 1890, users: 48 },
  { name: 'Jun', revenue: 2390, users: 38 },
];
const pieData = [
  { name: 'Fashion', value: 400 },
  { name: 'Electronics', value: 300 },
  { name: 'Accessories', value: 300 },
  { name: 'Sports', value: 200 },
];
const COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#14b8a6'];

const AdminAnalytics = () => {
  return (
    <>
      <Helmet><title>Analytics - Admin</title></Helmet>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">Revenue Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937' }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#ec4899" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.1}} className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">New User Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                 <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937' }} />
                <Area type="monotone" dataKey="users" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{delay: 0.2}} className="bg-slate-800/50 p-6 rounded-xl border border-purple-500/20">
            <h2 className="text-xl font-semibold text-white mb-4">Sales by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminAnalytics;