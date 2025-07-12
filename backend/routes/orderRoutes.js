import express from 'express';
import { sendOrderConfirmationEmail } from '../controllers/orderController.js';

const router = express.Router();

// Middleware for logging
router.use((req, res, next) => {
  console.log(`Orders route: ${req.method} ${req.originalUrl}`);
  next();
});

// GET /api/orders
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Orders endpoint is working',
    method: 'GET',
    timestamp: new Date().toISOString()
  });
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    await sendOrderConfirmationEmail(req, res);
  } catch (error) {
    console.error('Route error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        message: 'Server error occurred',
        error: error.message 
      });
    }
  }
});

export default router;