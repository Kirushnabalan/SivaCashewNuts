// controllers/orderController.js
import { createEmailTransporter, emailTemplates } from '../utils/email.js';

export const sendOrderConfirmationEmail = async (req, res) => {
  try {
    const { customer, items, totalAmount, orderDate } = req.body;

    // Validation
    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing order details' });
    }

    // Order object
    const order = {
      id: Date.now().toString(),
      customer,
      items,
      totalAmount,
      orderDate: orderDate || new Date().toISOString(),
    };

    // Send email
    try {
      const transporter = createEmailTransporter();
      const emailContent = emailTemplates.orderConfirmation({ ...order });

      await transporter.sendMail({
        from: `"Siva Cashew Nuts" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        subject: emailContent.subject,
        html: emailContent.html,
      });

      console.log('✅ Order email sent');
    } catch (e) {
      console.error('❌ Failed to send email:', e);
    }

    // Success response
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: {
        id: order.id,
        status: 'pending',
        totalAmount: order.totalAmount,
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
        }
      }
    });

  } catch (err) {
    console.error('🔥 Order Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to process order',
      error: err.message,
    });
  }
};
