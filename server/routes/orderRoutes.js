// routes/orderRoutes.js
import express from 'express';
import { sendOrderConfirmationEmail } from '../controllers/orderController.js';

const router = express.Router();
router.post('/', sendOrderConfirmationEmail);
export default router;
