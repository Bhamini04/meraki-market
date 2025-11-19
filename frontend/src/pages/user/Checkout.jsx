import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/services/orderService";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please login to proceed to checkout.
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Your cart is empty.
      </div>
    );
  }

  const handleChange = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const orderPayload = {
        orderItems: cartItems.map((item) => ({
          product: item._id || item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price,
          image: item.images?.[0],
        })),
        shippingAddress: address,
        totalPrice: getCartTotal(),
      };

      await createOrder(orderPayload);

      clearCart();
      toast({ title: "Order placed", description: "Your order has been placed successfully." });
      navigate("/order-confirmed");
    } catch (err) {
      console.error(err);
      toast({ title: "Order failed", description: "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Meraki Market</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {/* Address Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6"
          >
            <h1 className="text-2xl font-bold text-white mb-4">Shipping Address</h1>
            <form className="space-y-4" onSubmit={handlePlaceOrder}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Full Name</label>
                  <input
                    name="fullName"
                    value={address.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">Phone</label>
                  <input
                    name="phone"
                    value={address.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">Street</label>
                <input
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">City</label>
                  <input
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">State</label>
                  <input
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-1 block">PIN Code</label>
                  <input
                    name="pinCode"
                    value={address.pinCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-300 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-purple-500/20 pt-3 flex justify-between">
              <span className="text-gray-400 text-sm">Total</span>
              <span className="text-white font-semibold">
                ₹{getCartTotal()}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
