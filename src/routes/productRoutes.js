import express from 'express';
import { getAllProducts, getProductsByCategory, createProduct, updateProduct, deleteProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/category', getProductsByCategory);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/id/:id', deleteProductById);

export default router;
