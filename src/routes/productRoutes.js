import express from 'express';
import { getAllProducts, getProductsByCategory, createProduct, updateProduct, deleteProductByCode } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/category', getProductsByCategory);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/code/:product_code', deleteProductByCode);

export default router;
