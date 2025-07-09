// server/routes/orderRoutes.js
import express from 'express';
import { sendOrderConfirmationEmail } from '../controllers/orderController.js';

const router = express.Router();

// Middleware to log all requests to this route
router.use((req, res, next) => {
  console.log(`Orders route: ${req.method} ${req.originalUrl}`);
  next();
});

// GET /api/orders - Test endpoint
router.get('/', (req, res) => {
  console.log('GET /api/orders called');
  res.json({ 
    success: true, 
    message: 'Orders endpoint is working',
    method: 'GET',
    timestamp: new Date().toISOString()
  });
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  console.log('POST /api/orders called');
  console.log('Request body:', req.body);
  
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

// OPTIONS /api/orders - Handle preflight requests
router.options('/', (req, res) => {
  console.log('OPTIONS /api/orders called');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

export default router;