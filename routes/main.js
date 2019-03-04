const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
router.get('/', (req, res, next) =>{
    res.render('index');
});
router.get('/add-product', (req, res, next)=> {
    res.render('main/add-product');
});

router.post('/add-product',(req, res, next)=> {
    var product = new Product();

    product.category = req.body.category_name;
    product.name = req.body.product_name;
    product.price = req.body.product_price;
    product.cover = faker.image.image();

    product.save((err)=> {
        if (err) throw err
        res.redirect('/add-product')
    });
});
router.get('/products/:page', function(req, res, next) {
    var perPage = 5
    var page = req.params.page || 1

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products)=> {
            Product.countDocuments().exec((err, count)=> {
                if (err) return next(err)
                res.render('main/products', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
            });
        });
});
module.exports = router;
