import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { dummyCategories } from '@/utils/dummyData';
import ProductCard from '@/components/ProductCard';   // ✅ FIXED
import { Button } from '@/components/ui/button';

const Home = () => {
  const { products } = useProducts();
  const trendingProducts = products.filter((p) => p.trending).slice(0, 4);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <Helmet>
        <title>Meraki Market - Your Style Adda | Premium Fashion & Lifestyle</title>
        <meta
          name="description"
          content="Discover premium fashion and lifestyle products at Meraki Market. Shop trending styles with exclusive deals."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30 mb-6"
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span className="text-sm text-purple-300">New Collection 2024</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Meraki Market
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-purple-300 mb-4 font-semibold">
                Your Style Adda
              </p>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                Discover premium fashion and lifestyle products curated just for you. Experience luxury shopping with exclusive deals and trending styles.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6 text-lg">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/explore">
                  <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 px-8 py-6 text-lg">
                    Explore Collections
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-gray-400">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">50K+</p>
                  <p className="text-sm text-gray-400">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">4.8★</p>
                  <p className="text-sm text-gray-400">Rating</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative z-10"
              >
                <img
                  src="https://images.unsplash.com/photo-1547283731-f1564bf5918f"
                  className="rounded-3xl shadow-2xl"
                  alt="Fashion model showcasing premium clothing"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-10 -left-10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/30"
              >
                <TrendingUp className="w-8 h-8 text-pink-400 mb-2" />
                <p className="text-white font-semibold">Trending Now</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 bg-gradient-to-br from-teal-500/20 to-purple-500/20 backdrop-blur-xl p-6 rounded-2xl border border-teal-500/30"
              >
                <Shield className="w-8 h-8 text-teal-400 mb-2" />
                <p className="text-white font-semibold">Secure Shopping</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-purple-900/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Shop by <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-gray-400 text-lg">Explore our curated collections</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {dummyCategories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <Link to={`/category/${cat.name}`}>
                  <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 text-center hover:border-pink-500/50 transition-all">
                    <div className="text-5xl mb-3">{cat.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{cat.name}</h3>
                    <p className="text-gray-400 text-sm">{cat.count} items</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Trending</span> Products
            </h2>
            <p className="text-gray-400 text-lg">Most popular items this week</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-6">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-20 bg-gradient-to-b from-purple-900/20 to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">Collection</span>
            </h2>
            <p className="text-gray-400 text-lg">Handpicked premium products</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-400">100% secure payment with SSL encryption</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/10 to-teal-500/10 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-400">Quick delivery within 3-5 business days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-teal-500/10 to-pink-500/10 backdrop-blur-sm p-8 rounded-2xl border border-teal-500/20 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400">Handpicked products with quality guarantee</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
