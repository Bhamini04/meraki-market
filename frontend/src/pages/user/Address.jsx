import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const initialAddresses = [
  { id: 1, type: 'Home', line1: '123 Meraki Lane', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', isDefault: true },
  { id: 2, type: 'Work', line1: '456 Style Avenue', city: 'Delhi', state: 'Delhi', pincode: '110001', isDefault: false },
];

const Address = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    toast({
      title: 'Address Saved!',
      description: 'Your address has been successfully saved.',
    });
    setShowForm(false);
    setEditingAddress(null);
    // Here you would call a service to save the address
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: 'Address Deleted',
      variant: 'destructive',
    });
  };

  const openForm = (address = null) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  return (
    <>
      <Helmet>
        <title>My Addresses - Meraki Market</title>
        <meta name="description" content="Manage your shipping addresses." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">My Addresses</h1>
            <Button onClick={() => openForm()} className="bg-gradient-to-r from-pink-500 to-purple-500">
              <Plus className="w-4 h-4 mr-2" /> Add New Address
            </Button>
          </motion.div>

          {showForm ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/30 p-8 rounded-xl border border-purple-500/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name" required className="w-full p-3 bg-slate-800 rounded-lg border border-purple-500/30 text-white" defaultValue={editingAddress?.name} />
                  <input type="tel" placeholder="Phone Number" required className="w-full p-3 bg-slate-800 rounded-lg border border-purple-500/30 text-white" />
                </div>
                <textarea placeholder="Address (Area and Street)" required rows="3" className="w-full p-3 bg-slate-800 rounded-lg border border-purple-500/30 text-white" defaultValue={editingAddress?.line1}></textarea>
                <div className="grid md:grid-cols-3 gap-4">
                  <input type="text" placeholder="City/District/Town" required className="w-full p-3 bg-slate-800 rounded-lg border border-purple-500/30 text-white" defaultValue={editingAddress?.city} />
                  <input type="text" placeholder="State" required className="w-full p-3 bg-slate-800 rounded-lg border border-purple-500/30 text-white" defaultValue={editingAddress?.state} />
                  <input type="text" placeholder="Pincode" required className="w-full p-3 bg-slate-800 rounded-lg border border-purple-500/30 text-white" defaultValue={editingAddress?.pincode} />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500">Save Address</Button>
                  <Button variant="outline" onClick={() => { setShowForm(false); setEditingAddress(null); }}>Cancel</Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {addresses.map((addr, index) => (
                <motion.div
                  key={addr.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/30 p-6 rounded-xl border border-purple-500/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 mb-4">
                      {addr.type === 'Home' ? <Home className="w-6 h-6 text-pink-400" /> : <Briefcase className="w-6 h-6 text-teal-400" />}
                      <h3 className="text-xl font-bold text-white">{addr.type}</h3>
                      {addr.isDefault && <span className="text-xs bg-purple-500/50 text-purple-300 px-2 py-1 rounded-full">Default</span>}
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => openForm(addr)} variant="ghost" size="icon"><Edit className="w-4 h-4 text-gray-400 hover:text-white" /></Button>
                      <Button onClick={() => deleteAddress(addr.id)} variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" /></Button>
                    </div>
                  </div>
                  <div className="text-gray-300 space-y-1">
                    <p>{addr.line1}</p>
                    <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Address;