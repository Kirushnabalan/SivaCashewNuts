// server/routes/orderRoutes.js
import express from 'express';
import { sendOrderConfirmationEmail } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    // Add request logging for debugging
    console.log('Order request received:', {
      body: req.body,
      headers: req.headers,
      method: req.method
    });

    // Call the controller
    await sendOrderConfirmationEmail(req, res);
  } catch (error) {
    console.error('Route error:', error);
    
    // Ensure we always send a JSON response
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        message: 'Server error occurred' 
      });
    }
  }
});

// GET /api/orders - Optional: Get orders (for testing)
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Orders endpoint is working' 
  });
});

export default router;