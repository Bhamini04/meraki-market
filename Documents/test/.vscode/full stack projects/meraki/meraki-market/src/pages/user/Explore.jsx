import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';

const Explore = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  const newArrivals = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Explore - Meraki Market</title>
        <meta name="description" content="Explore featured collections and new arrivals at Meraki Market." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                Explore Our World
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Discover curated collections and the latest trends.</p>
          </motion.div>

          {/* Featured Collection */}
          <section className="mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-pink-400" />
                Featured Collection
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  <Link to={`/products/${product.id}`}>
                    <img class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" alt={product.name} src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                      <p className="text-purple-300">Shop Now <ArrowRight className="inline w-4 h-4" /></p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* New Arrivals */}
          <section>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-3xl font-bold text-white">New Arrivals</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {newArrivals.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden"
                >
                   <Link to={`/products/${product.id}`}>
                    <img class="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" alt={product.name} src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                       <p className="text-purple-300">Shop Now <ArrowRight className="inline w-4 h-4" /></p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
             <div className="text-center mt-12">
                <Link to="/products">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500">
                    See All Products
                  </Button>
                </Link>
              </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Explore;