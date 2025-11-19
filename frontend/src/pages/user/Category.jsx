import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/ProductCard.jsx';
import { Button } from '@/components/ui/button';

const Category = () => {
  const { name } = useParams();
  const { getProductsByCategory } = useProducts();
  const products = getProductsByCategory(name);

  return (
    <>
      <Helmet>
        <title>{name} - Meraki Market</title>
        <meta name="description" content={`Shop for premium products in the ${name} category at Meraki Market.`} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link to="/products">
              <Button variant="outline" className="mb-4 border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Products
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Category: <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{name}</span>
            </h1>
            <p className="text-gray-400">{products.length} products found.</p>
          </motion.div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
