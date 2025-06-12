import express from 'express';
import { createEmailTransporter } from "../config/email.js";

const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const { customerName, email, orderDetails } = req.body;
    
    if (!customerName || !email || !orderDetails) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transporter = createEmailTransporter();
    
    // Send email logic here
    
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

// Get all orders
router.get('/', (req, res) => {
  res.json({ message: "Get all orders" });
});

export default router;