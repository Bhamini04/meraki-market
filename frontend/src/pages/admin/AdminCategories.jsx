import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { dummyCategories } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminCategories = () => {
  const openForm = () => toast({ description: "🚧 Feature isn't implemented yet." });
  
  return (
    <>
      <Helmet><title>Manage Categories - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <Button onClick={openForm} className="bg-gradient-to-r from-pink-500 to-purple-500"><Plus className="w-4 h-4 mr-2" /> Add Category</Button>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
          <table className="w-full text-left text-white">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="p-4">Category Name</th>
                <th className="p-4">Product Count</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyCategories.map(c => (
                <tr key={c.id} className="border-b border-purple-500/20 hover:bg-purple-500/10">
                  <td className="p-4 flex items-center gap-4">
                    <span className="text-2xl">{c.icon}</span>
                    <span>{c.name}</span>
                  </td>
                  <td className="p-4">{c.count}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button onClick={openForm} variant="outline" size="icon" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"><Edit className="w-4 h-4" /></Button>
                      <Button onClick={() => toast({ description: 'Category deletion in progress.'})} variant="outline" size="icon" className="border-red-500/50 text-red-400 hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
};

export default AdminCategories;