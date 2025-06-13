import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createEmailTransporter, emailTemplates } from "./config/email.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
  'https://siva-cashew-nuts.vercel.app',
  'http://localhost:5174',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Email route
app.post('/api/email/send-order-email', async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;
    
    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ 
        message: 'Missing required fields' 
      });
    }

    const transporter = createEmailTransporter();
    const { subject, html } = emailTemplates.orderConfirmation(req.body);

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: customer.email,
      subject,
      html
    });

    res.status(200).json({ 
      message: 'Order email sent successfully' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      message: 'Failed to send email' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    message: 'Internal server error' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
