import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { getAllOrders, updateOrderStatus } from "@/services/orderService";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      await updateOrderStatus(id, status);
      toast({ title: "Order updated" });
      setOrders((prev) =>
        prev.map((o) =>
          (o._id === id) ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.error(err);
      toast({ title: "Update failed", description: "Try again later." });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Orders - Meraki Market</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Manage Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order, idx) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-6"
              >
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-gray-400 text-sm">
                      Order ID: <span className="text-white">{order._id}</span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      User:{" "}
                      <span className="text-white">
                        {order.user?.name || order.user?.email || "—"}
                      </span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      Date:{" "}
                      <span className="text-white">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "—"}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Total</p>
                    <p className="text-white font-semibold">
                      ₹{order.totalPrice ?? 0}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">Status</p>
                    <select
                      value={order.status || "Pending"}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="mt-1 bg-slate-800/80 border border-purple-500/30 rounded-lg px-2 py-1 text-sm text-white focus:outline-none"
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-purple-500/20 pt-3 mt-3">
                  <p className="text-gray-400 text-sm mb-2">Items:</p>
                  <ul className="space-y-1 text-sm text-gray-200">
                    {order.orderItems?.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>
                          {item.name} × {item.qty}
                        </span>
                        <span>₹{item.price * item.qty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminOrders;
