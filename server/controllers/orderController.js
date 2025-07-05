// server/controllers/orderController.js
import { createEmailTransporter, emailTemplates } from '../utils/email.js';

export const sendOrderConfirmationEmail = async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ message: 'Missing order details' });
    }

    const transporter = createEmailTransporter();
    const mailOptions = {
      from: `"Siva Cashew Nuts" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      ...emailTemplates.orderConfirmation({ customer, items, totalAmount }),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Order email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ message: 'Failed to send order email' });
  }
};
