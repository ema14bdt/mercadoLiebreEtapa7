const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');
const saveJSON = () => fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');

const controller = {
   // Root - Show all products
   index: (req, res) => {
      res.render('products', {
         products,
         toThousand,
         finalPrice,
      });
   },

   // Detail - Detail from one product
   detail: (req, res) => {
      let productDetail = products.find((producto) => producto.id === +req.params.id);

      res.render('detail', {
         productDetail,
         products,
         toThousand,
         finalPrice,
      });
   },

   // Create - Form to create
   create: (req, res) => {
      res.render('product-create-form');
   },

   // Create -  Method to store
   store: (req, res) => {
      let newProduct = {
         id: products[products.length - 1].id + 1,
         name: req.body.name,
         price: +req.body.price,
         discount: +req.body.discount,
         category: req.body.category,
         description: req.body.description,
         image: 'default-image.png',
      };
      products.push(newProduct);
      saveJSON();
      res.redirect(`/products/detail/${newProduct.id}`);
   },

   // Update - Form to edit
   edit: (req, res) => {
      let product = products.find((product) => product.id === +req.params.id);
      res.render('product-edit-form', {
         product,
      });
   },
   // Update - Method to update
   update: (req, res) => {
      products.forEach((product) => {
         if (product.id === +req.params.id) {
            product.name = req.body.name;
            product.price = +req.body.price;
            product.discount = +req.body.discount;
            product.category = req.body.category;
            product.description = req.body.description;
         }
      });
      saveJSON();
      res.redirect(`/products/detail/${req.params.id}`);
   },

   // Delete - Delete one product from DB
   destroy: (req, res) => {
      let deleteProduct = products.filter((product) => product.id != +req.params.id);
      products = deleteProduct;
      saveJSON();
      res.redirect('/products');
   },
};

module.exports = controller;
