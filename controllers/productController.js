import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
//@access Public
const getProductsByUser = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ user: req.params.id });
    res.json(products);
  } catch (error) {
    res.status(401);
    throw new Error('No Products Found');
  }
});

// @desc create product
// @route POST /api/productS
//@access admin
const createProduct = asyncHandler(async (req, res) => {
  const { productname, price, image } = req.body;

  const product = new Product({
    user: req.userProfileDetails._id,
    productname,
    price,
    image,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getProductsByUser, createProduct };
