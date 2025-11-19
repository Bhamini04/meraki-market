import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { fetchProducts } from "@/services/productService";
import { getAllOrders } from "@/services/orderService";
import { getUsers } from "@/services/userService";
import { TrendingUp, ShoppingBag, Users, CreditCard } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [products, orders, users] = await Promise.all([
          fetchProducts(),
          getAllOrders(),
          getUsers(),
        ]);

        const revenue = orders.reduce(
          (sum, o) => sum + (o.totalPrice || 0),
          0
        );

        setStats({
          products: products.length,
          users: users.length,
          orders: orders.length,
          revenue,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  const cards = [
    {
      label: "Total Products",
      value: stats.products,
      icon: ShoppingBag,
      color: "from-pink-500/20 to-purple-500/20 border-pink-500/30",
    },
    {
      label: "Total Users",
      value: stats.users,
      icon: Users,
      color: "from-teal-500/20 to-purple-500/20 border-teal-500/30",
    },
    {
      label: "Total Orders",
      value: stats.orders,
      icon: TrendingUp,
      color: "from-purple-500/20 to-slate-500/20 border-purple-500/30",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.revenue}`,
      icon: CreditCard,
      color: "from-yellow-500/20 to-pink-500/20 border-yellow-500/30",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Meraki Market</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-gradient-to-br ${card.color} border rounded-2xl p-5 backdrop-blur-sm flex items-center justify-between`}
            >
              <div>
                <p className="text-gray-400 text-sm">{card.label}</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {card.value}
                </p>
              </div>
              <card.icon className="w-8 h-8 text-white/80" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
