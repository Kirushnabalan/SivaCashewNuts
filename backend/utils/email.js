// utils/email.js
import nodemailer from 'nodemailer';

export const createEmailTransporter = () => {
  const { MAIL_USER, MAIL_PASS } = process.env;

  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error('Email config missing');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    }
  });
};

export const emailTemplates = {
  orderConfirmation: (order) => ({
    subject: '🛒 New Order Received - Siva Cashew Nuts',
    html: `
      <h2>New Order from ${order.customer.firstName} ${order.customer.lastName}</h2>
      <p>Email: ${order.customer.email}</p>
      <p>Items:</p>
      <ul>
        ${order.items.map(item => `
          <li>${item.name} × ${item.quantity} - ₹${item.price}</li>
        `).join('')}
      </ul>
      <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
    `
  })
};
