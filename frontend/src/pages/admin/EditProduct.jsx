import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AdminProducts = () => {
  const { products, setProducts } = useProducts();

  const openForm = () => toast({ description: "🚧 Feature isn't implemented yet." });
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ description: "Product deleted." });
  };
  
  return (
    <>
      <Helmet><title>Manage Products - Admin</title></Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <Button onClick={openForm} className="bg-gradient-to-r from-pink-500 to-purple-500"><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
          <table className="w-full text-left text-white">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-purple-500/20 hover:bg-purple-500/10">
                  <td className="p-4 flex items-center gap-4">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <span>{p.name}</span>
                  </td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4">₹{p.price.toLocaleString()}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button onClick={openForm} variant="outline" size="icon" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"><Edit className="w-4 h-4" /></Button>
                      <Button onClick={() => deleteProduct(p.id)} variant="outline" size="icon" className="border-red-500/50 text-red-400 hover:bg-red-500/20"><Trash2 className="w-4 h-4" /></Button>
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

export default AdminProducts;