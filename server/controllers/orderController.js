import { createEmailTransporter, emailTemplates } from '../utils/email.js';

export const sendOrderConfirmationEmail = async (req, res) => {
  try {
    const { customer, items, totalAmount, orderDate } = req.body;

    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing order details' });
    }

    if (!customer.firstName || !customer.lastName || !customer.email) {
      return res.status(400).json({ success: false, message: 'Missing customer information' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items are required' });
    }

    const order = {
      id: Date.now().toString(),
      customer,
      items,
      totalAmount,
      orderDate: orderDate || new Date().toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log('Processing order:', order);

    try {
      const transporter = createEmailTransporter();
      const mailOptions = {
        from: `"Siva Cashew Nuts" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        ...emailTemplates.orderConfirmation({ customer, items, totalAmount }),
      };
      await transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({ 
      success: true,
      message: 'Order placed successfully',
      order: {
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
        customer: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email
        }
      }
    });

  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({ success: false, message: 'Failed to process order. Please try again.' });
  }
};