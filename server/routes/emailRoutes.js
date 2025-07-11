import express from 'express';
import { createEmailTransporter } from '../utils/email.js';

const router = express.Router();

router.post('/send-order-email', async (req, res) => {
  try {
    const { customer, items, total, orderDate } = req.body;

    if (!customer?.email || !items?.length) {
      return res.status(400).json({
        success: false,
        message: 'Missing required order information'
      });
    }

    const transporter = createEmailTransporter();

    const emailContent = {
      subject: 'Order Confirmation - Siva Cashew Nuts',
      html: `
        <h2>Order Confirmation</h2>
        <p>Dear ${customer.name},</p>
        <p>Thank you for your order!</p>
        <ul>
          ${items.map(item => `
            <li>${item.name} x ${item.quantity} - ₹${item.price * item.quantity}</li>
          `).join('')}
        </ul>
        <p>Total: ₹${total}</p>
        <p>Order Date: ${new Date(orderDate).toLocaleDateString()}</p>
      `
    };

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: customer.email,
      bcc: process.env.MAIL_USER,
      subject: emailContent.subject,
      html: emailContent.html
    });

    res.status(200).json({
      success: true,
      message: 'Order confirmation email sent successfully'
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send order email',
      error: error.message
    });
  }
});

export default router;