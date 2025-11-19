import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-xl"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Discount Badge */}
      {product.originalPrice > product.price && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => addToWishlist(product)}
        className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur-sm p-2 rounded-full hover:bg-pink-500 transition-all"
      >
        <Heart
          className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-pink-500 text-pink-500' : 'text-white'}`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <Link to={`/products/${product.id}`}>
          <p className="text-xs text-purple-400 mb-1">{product.category}</p>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-pink-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-300">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold text-white">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
