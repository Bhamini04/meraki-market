
import Order from "../models/Order.js";

// POST /api/orders  (User)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ message: "Total price must be greater than 0" });
    }

    // Debug: log payload once if needed
    // console.log("Creating order for user:", req.user?._id);
    // console.log("Body:", req.body);

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({
      message: "Server error while creating order",
      error: err.message,
    });
  }
};

// GET /api/orders/my  (User)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
    res.json(orders);
  } catch (err) {
    console.error("Get my orders error:", err);
    res.status(500).json({ message: "Server error while fetching your orders" });
  }
};

// GET /api/orders/:id  (User)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Optionally also ensure the logged-in user owns the order (if not admin)
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not allowed to view this order" });
    }

    res.json(order);
  } catch (err) {
    console.error("Get order by id error:", err);
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

// GET /api/orders  (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort("-createdAt");

    res.json(orders);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// PUT /api/orders/:id/status  (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, isPaid, isDelivered } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (status) order.status = status;
    if (typeof isPaid === "boolean") {
      order.isPaid = isPaid;
      order.paidAt = isPaid ? new Date() : undefined;
    }
    if (typeof isDelivered === "boolean") {
      order.isDelivered = isDelivered;
      order.deliveredAt = isDelivered ? new Date() : undefined;
    }

    const updated = await order.save();
    res.json({ message: "Order updated", order: updated });
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: "Server error while updating order", error: err.message });
  }
};
