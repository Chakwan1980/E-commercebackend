import express from 'express';
import { getAllProducts, createProduct } from '../controllers/backendController.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', validateProduct, createProduct);

export default router;
