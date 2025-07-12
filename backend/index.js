import express from 'express';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorhandler.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json());
app.use(logger);

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/email', emailRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors({
  origin: ['https://siva-cashew-nuts-57uc.vercel.app'], // ✅ Frontend domain
  credentials: true
}));