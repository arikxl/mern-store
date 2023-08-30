import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils/utils.js';


import Product from '../models/productModel.js';

const productRouter = express.Router();

const PAGE_SIZE = 3;


productRouter.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products)
});

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product not found'})
    }
})

productRouter.get('/:id',async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
});

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

// productRouter.get(
//   '/admin',
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const { query } = req;
//     const page = query.page || 1;
//     const pageSize = query.pageSize || PAGE_SIZE;

//     const products = await Product.find()
//       .skip(pageSize * (page - 1))
//       .limit(pageSize);
//     const countProducts = await Product.countDocuments();
//     res.send({
//       products,
//       countProducts,
//       page,
//       pages: Math.ceil(countProducts / pageSize),
//     });
//   })
// );


productRouter.post(
  '/',
  isAuth,
  isAdmin,
    expressAsyncHandler(async (req, res) => {
      

    const newProduct = new Product({
      title: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      img1: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      stock: 0,
      rating: 0,
      numOfReviews: 0,
      desc: 'sample description',
    });
    const product = await newProduct.save();
    res.send({ message: 'Product Created', product });
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.title = req.body.title;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.img1 = req.body.img1;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.stock = req.body.stock;
      product.desc = req.body.desc;
      await product.save();
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);


export default productRouter;
