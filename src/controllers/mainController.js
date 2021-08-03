const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	index: (req, res) => {
		res.render('index',{
			visited : products.filter(producto => producto.category === 'visited'),
			inSale : products.filter(producto => producto.category === 'in-sale'),
			toThousand,
			finalPrice,
		})
	},
	search: (req, res) => {
		//if
		// En la busqueda, paso todo a minuscula y elimino los espacios con trim()
		let resultSearch = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()));
		res.render('results',{
			resultSearch,
			finalPrice,
			keywords : req.query.keywords,
		})
	},
};

module.exports = controller;
