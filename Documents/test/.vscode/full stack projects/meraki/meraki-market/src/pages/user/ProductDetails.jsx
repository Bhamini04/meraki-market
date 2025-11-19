import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { dummyReviews } from '@/utils/dummyData';
import { Button } from '@/components/ui/button';
import ProductCard from "@/components/ProductCard.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import { cn } from "@/utils/helpers.js";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Product not found</p>
      </div>
    );
  }

  const productReviews = dummyReviews.filter((r) => r.productId === product.id);

  return (
    <>
      <Helmet>
        <title>{product.name} - Meraki Market</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/products">
            <Button variant="outline" className="mb-8 border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mb-4 rounded-2xl overflow-hidden"
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </motion.div>

              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-pink-500' : 'border-purple-500/30'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-purple-400 mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-white">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                {/* Stock Status */}
                <div className="mb-6">
                  <p className="text-gray-400">
                    Stock: <span className="text-green-400 font-semibold">{product.stock} available</span>
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">Quantity</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-slate-800 border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/20 transition-all"
                    >
                      -
                    </button>
                    <span className="text-white text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 bg-slate-800 border border-purple-500/30 rounded-lg text-white hover:bg-purple-500/20 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <Button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 text-lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => addToWishlist(product)}
                    variant="outline"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 py-6"
                  >
                    <Heart
                      className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-pink-500 text-pink-500' : ''}`}
                    />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                    <Truck className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-white font-semibold">Free Delivery</p>
                    <p className="text-gray-400 text-sm">On orders above ₹999</p>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
                    <Shield className="w-6 h-6 text-teal-400 mb-2" />
                    <p className="text-white font-semibold">Secure Payment</p>
                    <p className="text-gray-400 text-sm">100% secure checkout</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {productReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white font-semibold">{review.userName}</p>
                      <p className="text-gray-400 text-sm">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;