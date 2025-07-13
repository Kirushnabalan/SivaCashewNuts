// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorhandler.js';

dotenv.config();

const app = express();

// ✅ CORS MUST COME BEFORE ROUTES
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

// Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/email', emailRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
