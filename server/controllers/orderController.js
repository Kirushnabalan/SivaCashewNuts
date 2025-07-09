// server/controllers/orderController.js
import { createEmailTransporter, emailTemplates } from '../utils/email.js';

export const sendOrderConfirmationEmail = async (req, res) => {
  try {
    const { customer, items, totalAmount, orderDate } = req.body;

    // Validate required fields
    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing order details' 
      });
    }

    // Validate customer details
    if (!customer.firstName || !customer.lastName || !customer.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing customer information' 
      });
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart items are required' 
      });
    }

    // Create order object
    const order = {
      id: Date.now().toString(), // Use proper ID generation in production
      customer,
      items,
      totalAmount,
      orderDate: orderDate || new Date().toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Log the order for debugging
    console.log('Processing order:', order);

    // Try to send email (but don't fail the order if email fails)
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
      console.error('Email sending failed (but order still processed):', emailError);
      // Don't fail the order just because email failed
    }

    // Always return success response with proper JSON
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
    
    // Always return JSON response, even for errors
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process order. Please try again.' 
    });
  }
};