const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')


const app = express()
const port = 3000
app.set('view engine', 'ejs');


const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const errorController = require('./controllers/error.js');
app.use('/admin', adminRoutes);
app.use(shopRoutes);






// chỉ định thư mục gốc 
app.use(express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/assets', express.static('public'))

// Thiết lập multer để lưu trữ tệp tin trong thư mục "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images/product/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }

});

const upload = multer({ storage: storage });

// index
// app.get('/', (req, res) => {
//     // res.send('Hello World!')
//     res.render('index', {
//         title: 'Home'
//     })
// })

// app.get('/client/product/list', (req, res) => {
//     connection.query('SELECT * FROM product', (error, results, fields) => {
//         if (error) throw error;
//         console.log(error);

//         res.render('client/product/list', {
//             title: 'list',
//             products: results
//         })


//     })
// })

// login
// app.get('/client/module/login', (req, res) => {
//     res.render("client/module/login", { title: 'Login' })
// })




// // detail
// app.get('/product/:id', (req, res) => {
//     const productId = parseInt(req.params.id);
//     connection.query(`SELECT * FROM product WHERE id = ${productId}`, (error, results, fields) => {
//         if (error) throw error;
//         console.log(error);
//         res.render('client/product/detail', { title: 'Product Detail', product: results[0] });
//     });
// });
// app.get('/img', (req, res) => {
//     res.render('image', { title: 'Image' });
// })

///////////////////////////ADMIN///////////////////////////////////

// app.get('/admin/layouts/dashboard', (rep, res) => {
//     res.render('admin/layouts/dashboard', { title: 'Dashboard' })
// })

// app.get('/admin/product/list', (rep, res) => {
//     res.render('admin/product/list', { title: 'List Product' })
// })

// app.get('/admin/product/add', (req, res) => {
//     connection.query('SELECT * FROM category', (error, results, fields) => {
//         console.log(error);
//         res.render('admin/product/add', { title: 'Create ', category: results });
//     })
// })

// app.post('/admin/product/add', upload.single('image'), (req, res) => {
//     const file = req.file;
//     const name = req.body.name;
//     const price = req.body.price;
//     const author = req.body.author;
//     const date = Date.now();
//     const idcategory = req.body.idcategory;
//     const description = req.body.description;
//     const img = file.filename;

//     const product = {
//         name, price, img, description, date, author, idcategory
//     };
//     connection.query('INSERT INTO product SET ?', product, (error, results, fields) => {
//         if (error) throw error;
//         console.log('Product created successfully');
//         res.redirect('/admin/product/list');
//     });
// });








app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
