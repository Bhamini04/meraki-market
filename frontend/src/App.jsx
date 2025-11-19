import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Context Providers
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ProductProvider } from '@/context/ProductContext';
import { AdminProvider, useAdmin } from '@/context/AdminContext';

// UI
import { Toaster } from '@/components/ui/toaster';

// User Pages
import Home from '@/pages/user/Home';
import Products from '@/pages/user/Products';
import ProductDetails from '@/pages/user/ProductDetails.jsx';
import Cart from '@/pages/user/Cart';
import Wishlist from '@/pages/user/Wishlist';
import Checkout from '@/pages/user/Checkout';
import Login from '@/pages/user/Login';
import Signup from '@/pages/user/Signup';
import Profile from '@/pages/user/Profile';
import Orders from '@/pages/user/Orders';
import Explore from '@/pages/user/Explore';
import Contact from '@/pages/user/Contact';
import About from '@/pages/user/About';
import Category from '@/pages/user/Category';
import OrderConfirmed from '@/pages/user/OrderConfirmed';
import Address from '@/pages/user/Address';

// Admin Pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminProducts from '@/pages/admin/AdminProducts';
import AdminCategories from '@/pages/admin/AdminCategories';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminOrders from '@/pages/admin/AdminOrders';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';

// Layouts
import UserLayout from '@/components/layouts/UserLayout';
import AdminLayout from '@/components/layouts/AdminLayout';


// 🔒 Admin Protected Route
const AdminRoute = ({ children }) => {
  const { isAdminAuthenticated } = useAdmin();
  return isAdminAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <AdminProvider>
              <Router>
                <Helmet>
                  <title>Meraki Market - Your Style Adda</title>
                  <meta
                    name="description"
                    content="Discover premium fashion and lifestyle products at Meraki Market. Your ultimate style destination."
                  />
                </Helmet>

                <Routes>

                  {/* USER ROUTES */}
                  <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="order-confirmed" element={<OrderConfirmed />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="addresses" element={<Address />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="category/:name" element={<Category />} />
                  </Route>

                  {/* AUTH ROUTES */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* ADMIN PUBLIC ROUTE */}
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* ADMIN PROTECTED ROUTES */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminLayout />
                      </AdminRoute>
                    }
                  >
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                  </Route>

                </Routes>

                <Toaster />
              </Router>
            </AdminProvider>
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
