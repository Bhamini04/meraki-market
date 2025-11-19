import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, User, Search, Menu, X, LogOut, Package, Home } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 bg-clip-text text-transparent"
            >
              Meraki Market
            </motion.div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/explore" className="nav-link">Explore</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>

            {/* ⭐ ADMIN LOGIN */}
            <Link to="/admin/login" className="nav-link hover:text-teal-400">
              Admin
            </Link>
          </div>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 pl-10 bg-slate-800/50 border border-purple-500/30 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>

          {/* ICONS */}
          <div className="flex items-center space-x-4">

            {/* Wishlist */}
            <Link to="/wishlist" className="relative icon-wrapper">
              <Heart className="nav-icon hover:text-pink-400" />
              {wishlistItems.length > 0 && (
                <span className="badge pink">{wishlistItems.length}</span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative icon-wrapper">
              <ShoppingCart className="nav-icon hover:text-purple-400" />
              {getCartCount() > 0 && (
                <span className="badge purple">{getCartCount()}</span>
              )}
            </Link>

            {/* PROFILE / LOGIN */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="cursor-pointer"
                >
                  <User className="nav-icon hover:text-teal-400" />
                </motion.div>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 w-48 bg-slate-800 shadow-xl border border-purple-500/20 rounded-lg p-3"
                    >
                      <Link to="/profile" className="dropdown-item">
                        <User size={16} /> My Profile
                      </Link>
                      <Link to="/orders" className="dropdown-item">
                        <Package size={16} /> My Orders
                      </Link>
                      <Link to="/addresses" className="dropdown-item">
                        <Home size={16} /> Saved Addresses
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-red-400 hover:text-red-300"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20">
                  Login
                </Button>
              </Link>
            )}

            {/* MOBILE MENU BUTTON */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-300">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className="mobile-link">Home</Link>
                <Link to="/products" className="mobile-link">Products</Link>
                <Link to="/explore" className="mobile-link">Explore</Link>
                <Link to="/about" className="mobile-link">About</Link>
                <Link to="/contact" className="mobile-link">Contact</Link>

                <Link to="/admin/login" className="mobile-link text-teal-300">
                  Admin
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
