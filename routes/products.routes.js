const router = require('express').Router();

const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/products.controller');

router.post('/create', createProduct);

router.get('/', getAllProduct);

router.get('/:id', getSingleProduct);

router.patch('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
