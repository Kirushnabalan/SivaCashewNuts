import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
