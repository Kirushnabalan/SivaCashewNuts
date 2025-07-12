import express from 'express';
const router = express.Router();

// Get all products
router.get('/', (req, res) => {
  res.json({ message: 'Get all products' });
});

// Get single product by ID
router.get('/:productId', (req, res) => {
  res.json({ message: `Get product ${req.params.productId}` });
});

export default router;