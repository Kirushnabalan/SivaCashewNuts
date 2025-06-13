import nodemailer from "nodemailer"

export const createEmailTransporter = () => {
  const { MAIL_USER, MAIL_PASS } = process.env;
  
  if (!MAIL_USER || !MAIL_PASS) {
    throw new Error("Email configuration missing. Please set MAIL_USER and MAIL_PASS environment variables.");
  }

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: process.env.MAIL_PORT || 587,
    secure: false,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const emailTemplates = {
  orderConfirmation: (orderDetails) => ({
    subject: 'New Order Received - Siva Cashew Nuts',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
          New Order Received
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
          <p><strong>Name:</strong> ${orderDetails.customer.firstName} ${orderDetails.customer.lastName}</p>
          <p><strong>Email:</strong> ${orderDetails.customer.email}</p>
          <p><strong>Phone:</strong> ${orderDetails.customer.phone}</p>
          <p><strong>Address:</strong> ${orderDetails.customer.address}, ${orderDetails.customer.city}</p>
          ${orderDetails.customer.country ? `<p><strong>Country:</strong> ${orderDetails.customer.country}</p>` : ''}
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #667eea; color: white;">
                <th style="padding: 10px; text-align: left;">Item</th>
                <th style="padding: 10px; text-align: right;">Quantity</th>
                <th style="padding: 10px; text-align: right;">Price</th>
                <th style="padding: 10px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails.items.map(item => `
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 10px;">${item.name}</td>
                  <td style="padding: 10px; text-align: right;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right;">₹${item.price.toFixed(2)}</td>
                  <td style="padding: 10px; text-align: right;">₹${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr style="background: #f3f4f6;">
                <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total Amount:</strong></td>
                <td style="padding: 10px; text-align: right;"><strong>₹${orderDetails.totalAmount.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="margin-top: 20px; text-align: center; color: #666;">
          <p>Thank you for your order!</p>
          <p style="font-size: 12px;">© ${new Date().getFullYear()} Siva Cashew Nuts. All rights reserved.</p>
        </div>
      </div>
    `
  })
}
