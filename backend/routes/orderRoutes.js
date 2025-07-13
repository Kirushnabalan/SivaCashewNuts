// routes/orderRoutes.js
import express from 'express';
import { sendOrderConfirmationEmail } from '../controllers/orderController.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Orders endpoint is working',
    timestamp: new Date().toISOString()
  });
});

// Actual POST route
router.post('/', sendOrderConfirmationEmail);

export default router;
