import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders } from "@/services/orderService";

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading orders...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please login to see your orders.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders - Meraki Market</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">My Orders</h1>

          {orders.length === 0 ? (
            <p className="text-gray-400">You have no orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6"
                >
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-gray-400 text-sm">
                        Order ID: <span className="text-white">{order._id}</span>
                      </p>
                      <p className="text-gray-400 text-sm">
                        Date:{" "}
                        <span className="text-white">
                          {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Status</p>
                      <p className="text-pink-400 font-semibold">
                        {order.status || "Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/20 pt-3 mt-3">
                    <p className="text-gray-400 text-sm mb-2">Items:</p>
                    <ul className="space-y-1 text-sm text-gray-200">
                      {order.orderItems?.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>
                            {item.name} × {item.qty}
                          </span>
                          <span>₹{item.price * item.qty}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-purple-500/20 mt-3 pt-3 flex justify-between">
                    <span className="text-gray-400 text-sm">Total</span>
                    <span className="text-white font-semibold">
                      ₹{order.totalPrice ?? 0}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
