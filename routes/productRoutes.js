import express from 'express';
import {
  createProduct,
  getProductsByUser,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getProductsByUser).post(protect, admin, createProduct);

export default router;
