
const Product = require('../model/product')


exports.getProducts = (req, res) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/product/list', {
                pageTitle: 'List Product',
                path: '/admin/product/list',
                getProductsList: true,
                products: products // Truyền danh sách sản phẩm vào giao diện
            });
        })
        .catch(err => {
            // Xử lý lỗi nếu có
            console.error('Error retrieving products:', err);
            // Render trang với thông báo lỗi
            res.render('error', { message: 'Error retrieving products', error: err });
        });

};
exports.getDetailProAdmin = (req, res) => {
    const id = parseInt(req.params.id);
    Product.fetchDetailPro(id)
        .then(product => {
            Product.fetchAllCategories()
                .then(category => {
                    res.render('admin/product/detail', {
                        pageTitle: 'Product Detail',
                        path: '/admin/product/detail',
                        getDetailPro: true,
                        product: product,
                        category: category
                    });
                });
        });
}



exports.getDashBoard = (req, res) => {
    res.render('admin/layouts/dashboard', {
        pageTitle: 'Dashboard', path: '/admin/layouts/dashboard',
        getDashBoard: true
    });
};
exports.postAddProduct = (req, res, next) => {
    console.log(req.body);
    const file = req.file;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let img = file.filename;
    let author = req.body.author;
    let date = new Date(Date.now());
    let idcategory = req.body.idcategory;

    let product = {
        name: name,
        price: price,
        description: description,
        img: img,
        author: author,
        date: date,
        idCategory: idcategory
    };

    Product.saveProduct(product)
        .then(result => {
            console.log('Product added successfully');
            res.redirect('/admin/product/list');
        })
        .catch(err => {
            console.error('Error adding product:', err);
            res.render('error', { message: 'Error adding product', error: err });
        });
};

exports.getAddProduct = (req, res) => {
    Product.fetchAllCategories()
        .then((categories) => {
            console.log(categories); // Kiểm tra xem biến categories có chứa dữ liệu không
            res.render('admin/product/add', {
                pageTitle: 'Dashboard',
                path: '/admin/product/add',
                getAddProduct: true,
                categories: categories,
            });
        })
        .catch((err) => {
            console.error('Error fetching categories:', err);
            res.render('error', { message: 'Error fetching categories', error: err });
        });
};

// exports.postAddProduct = (req, res, next) => {
//     products.push({ title: req.body.title });
//     res.redirect('/');
// };
// exports.getDashBoard = (req, res, next) => {
//     res.render('admin/', {
//         prods: products,
//         pageTitle: 'ADMIN',
//         path: '/admin',
//         hasProducts: products.length > 0,
//         activeShop: true,
//     });
// };



//////////CLIENT/////////

exports.getShop = (rep, res) => {
    res.render('index', {
        title: 'Book Store', path: '/index',
        getShop: true
    });
}

exports.getProductsList = (req, res) => {
    // Gọi phương thức fetchAll để lấy danh sách sản phẩm
    Product.fetchAll()
        .then(products => {
            // Render trang với danh sách sản phẩm và danh sách danh mục
            Product.fetchAllCategories()
                .then(categories => {
                    res.render('client/product/list', {
                        title: 'List Product',
                        path: '/client/product/list',
                        getProductsList: true,
                        products: products, // Danh sách sản phẩm
                        categories: categories // Danh sách danh mục
                    });
                })
                .catch(err => {
                    console.error('Error retrieving categories:', err);
                    res.render('error', { title: 'List Product', message: 'Error retrieving categories', error: err });
                });
        })
        .catch(err => {
            // Xử lý lỗi nếu có
            console.error('Error retrieving products:', err);
            // Render trang với thông báo lỗi
            res.render('error', { message: 'Error retrieving products', error: err });
        });
};
exports.getProductsByCategory = (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    Product.fetchProductsByCategory(categoryId)
        .then(products => {
            Product.fetchAllCategories()
                .then(categories => {
                    res.render('client/product/list', {
                        title: 'List Product',
                        path: '/client/product/list',
                        categoryId: categoryId,
                        categories: categories,
                        products: products
                    });
                })
                .catch(err => {
                    console.error('Error retrieving categories:', err);
                    res.render('client/product/list', { title: 'List Product', message: 'Error retrieving categories', error: err });
                });
        })
        .catch(err => {
            console.error('Error retrieving products by category:', err);
            res.render('client/product/list', { title: 'List Product', message: 'Error retrieving products by category', error: err });
        });
};




exports.getDetailPro = (req, res) => {
    const id = parseInt(req.params.id);
    Product.fetchDetailPro(id)
        .then(product => {
            res.render('client/product/detail', {
                title: 'Detail Product',
                product: product
            });
        })
        .catch(err => {
            console.error('lỗi chi tiết:', err);
            res.render('error', { message: 'Error retrieving product details', error: err });
        });
};

exports.getLogin = (rep, res) => {
    res.render('client/moudel/login', {
        title: 'Book Store', path: '/client/moudel/login',
        getLogin: true
    });
}