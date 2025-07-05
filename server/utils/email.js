import nodemailer from 'nodemailer';

export const createEmailTransporter = () => {
  const { MAIL_USER, MAIL_PASS } = process.env;

  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error('Email configuration missing');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
  });
};

export const emailTemplates = {
  orderConfirmation: (orderDetails) => ({
    subject: 'New Order Received - Siva Cashew Nuts',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-bottom: 20px;">
          🛒 New Order Received
        </h2>

        <!-- Customer Info -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin: 0 0 10px;">Customer Information</h3>
          <p style="margin: 6px 0;"><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p style="margin: 6px 0;"><strong>Name:</strong> ${orderDetails.customer.firstName} ${orderDetails.customer.lastName}</p>
          <p style="margin: 6px 0;"><strong>Email:</strong> ${orderDetails.customer.email}</p>
          <p style="margin: 6px 0;"><strong>Phone:</strong> ${orderDetails.customer.phone}</p>
          <p style="margin: 6px 0;"><strong>Payment Method:</strong> ${orderDetails.postalCode}</p>
          <p style="margin: 6px 0;"><strong>Order Date:</strong> ${new Date(orderDetails.orderDate).toLocaleDateString()}</p>
          <p style="margin: 6px 0;"><strong>Address:</strong> ${orderDetails.customer.address}, ${orderDetails.customer.city}</p>
          ${
            orderDetails.customer.country
              ? `<p style="margin: 6px 0;"><strong>Country:</strong> ${orderDetails.customer.country}</p>`
              : ''
          }
        </div>

        <!-- Order Details -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #333; margin: 0 0 10px;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background: #667eea; color: white;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: right;">Qty</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails.items
                .map(
                  (item) => `
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 10px;">${item.name}</td>
                  <td style="padding: 10px; text-align: right;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right;">₹${item.price.toFixed(2)}</td>
                  <td style="padding: 10px; text-align: right;">₹${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              `
                )
                .join('')}
              <tr style="background: #f3f4f6;">
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total Amount:</strong></td>
                <td style="padding: 10px; text-align: right;"><strong>₹${orderDetails.totalAmount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div style="text-align: center; color: #999; font-size: 13px;">
          <p>Thank you for choosing <strong>Siva Cashew Nuts</strong>!</p>
          <p style="margin-top: 10px;">© ${new Date().getFullYear()} Siva Cashew Nuts. All rights reserved.</p>
        </div>
      </div>
    `,
  }),
}
