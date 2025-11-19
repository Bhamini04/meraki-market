import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderConfirmed = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'MM-12345-67890';

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Meraki Market</title>
        <meta name="description" content="Your order has been successfully placed." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="relative w-full max-w-lg text-center"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-lg opacity-50" />
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 md:p-12 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for your purchase. Your order is being processed.
            </p>
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-4 mb-8">
              <p className="text-gray-400">Your Order ID is:</p>
              <p className="text-white font-mono text-lg md:text-xl tracking-wider">{orderId}</p>
            </div>
            <div className="flex items-center justify-center gap-4 text-gray-300 mb-8">
              <Package className="w-6 h-6 text-purple-400" />
              <span>Expected Delivery: Nov 20, 2025 - Nov 23, 2025</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/orders">
                <Button variant="outline" className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                  View My Orders
                </Button>
              </Link>
              <Link to="/products">
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default OrderConfirmed;