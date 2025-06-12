import express from "express"
import { createEmailTransporter, emailTemplates } from "../config/email.js"

const router = express.Router()

router.post("/send-order-email", async (req, res) => {
  try {
    const { orderDetails } = req.body
    
    // Validate order details
    if (!orderDetails || !orderDetails.customer || !orderDetails.items) {
      return res.status(400).json({ message: "Invalid order details" })
    }

    const transporter = createEmailTransporter()
    const template = emailTemplates.orderConfirmation(orderDetails)

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: orderDetails.customer.email, // Send to customer email
      bcc: process.env.MAIL_USER, // BCC store owner
      ...template
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: "Order email sent successfully" })
  } catch (error) {
    console.error("Email error:", error)
    res.status(500).json({ 
      message: "Failed to send order email",
      error: error.message 
    })
  }
})

router.post("/send-contact", async (req, res) => {
  try {
    const { from, subject, message } = req.body;
    
    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: "kirushnabalan1803@gmail.com",
      replyTo: from,
      subject: subject,
      text: `${message}\n\nContact Number: +94 778042144`, // Added contact number
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

export default router
