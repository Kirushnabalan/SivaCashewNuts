import express from "express"
import { createEmailTransporter, emailTemplates } from "../config/email.js"

const router = express.Router()

router.post("/send-order-email", async (req, res) => {
  try {
    // Validate order details
    if (!req.body || !req.body.customer || !req.body.items) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details"
      });
    }

    const orderDetails = req.body;
    const transporter = createEmailTransporter();
    const template = emailTemplates.orderConfirmation(orderDetails);

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: orderDetails.customer.email,
      bcc: process.env.MAIL_USER,
      ...template
    });
    
    res.status(200).json({
      success: true,
      message: "Order email sent successfully"
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send order email",
      error: error.message
    });
  }
})

export default router
