import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-purple-500/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-4"
            >
              Meraki Market
            </motion.div>
            <p className="text-gray-400 text-sm mb-4">Your Style Adda</p>
            <p className="text-gray-500 text-sm">
              Discover premium fashion and lifestyle products at unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-white font-semibold mb-4 block">Quick Links</span>
            <div className="flex flex-col space-y-2">
              <Link to="/products" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Products
              </Link>
              <Link to="/explore" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Explore
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <span className="text-white font-semibold mb-4 block">Customer Service</span>
            <div className="flex flex-col space-y-2">
              <Link to="/orders" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Track Order
              </Link>
              <Link to="/profile" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                My Account
              </Link>
              <Link to="/wishlist" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Wishlist
              </Link>
              <Link to="/cart" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <span className="text-white font-semibold mb-4 block">Contact Us</span>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>bhaminitiwari665@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 9799980322</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Prayagraj, UttarPradesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Meraki Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;