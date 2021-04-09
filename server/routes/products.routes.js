const router = require('express').Router();
const upload = require('../utils/fileUpload');

const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controller/products.controller');

const { roles, authorization } = require('../controller/auth.controller');

router.post('/create', upload.single('productImg'), createProduct);
// router.post(
//   '/create',
//   authorization,
//   roles('admin'), //this restricts a user from creating product note only admin can
//   upload.single('productImg'),
//   createProduct
// );

router.get('/', getAllProduct);

router.get('/:id', getSingleProduct);

router.patch(
  '/update/:id',
  authorization,
  roles('admin'),
  upload.single('productImg'),
  updateProduct
);
router.delete('/delete/:id', authorization, roles('admin'), deleteProduct);

module.exports = router;
