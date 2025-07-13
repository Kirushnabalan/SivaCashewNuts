// routes/productRoutes.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'All products listed here' });
});

export default router;
