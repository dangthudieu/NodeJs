var connection = require('./database');
var products = [];
// Class Product để thao tác với sản phẩm
module.exports = class Product {
    constructor() {
    }
    static saveProduct(product) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO product (name, author, idcategory, price, description, date, img) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            let values = [product.name, product.author, product.idCategory, product.price, product.description, product.date, product.img];
            connection.query(sql, values, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    static fetchAll() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM product`;
            connection.query(sql, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    static fetchDetailPro(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM product WHERE id = ${id}`;
            connection.query(sql, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data[0]);
                }
            })
        })
    }
    static fetchAllCategories() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM category`;
            connection.query(sql, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
    static fetchProductsByCategory(categoryId) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM product WHERE idcategory = ${categoryId}`;
            connection.query(sql, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
};