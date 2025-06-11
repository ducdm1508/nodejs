const express = require('express');
const app = express();
const port = 3000;
const mySql = require('mysql2');
const cors = require('cors');

const db = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'products'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    };
    console.log('Connected to database');
});

app.use(express.json());
app.use(cors());

class Product {
    constructor(title, price, iDate, qty) {
        this.title = title;
        this.price = price;
        this.iDate = iDate;
        this.qty = qty;
    }
}


app.get('/products', (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) {
            console.error('Error fetching products: ' + err);
            res.status(500).send({ error: 'Error fetching products' });
            return;
        }
        res.status(200).json(results);
    });
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM product WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send({ error: 'Error fetching product' });
        if (results.length === 0) return res.status(404).send({ error: 'Product not found' });
        res.status(200).json(results[0]);
    });
});

app.post('/products', (req, res) => {
    const { title, price, iDate, qty } = req.body;
    const values = [title, price, iDate, qty];
    db.query('INSERT INTO product (title, price, iDate, qty) VALUES (?, ?, ?, ?)', values, (err, result) => {
        if (err) return res.status(500).send({ error: 'Error inserting product' });
        res.status(201).send({ message: 'Product inserted successfully', productId: result.insertId });
    });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, iDate, qty } = req.body;
    const values = [title, price, iDate, qty, id];
    db.query('UPDATE product SET title = ?, price = ?, iDate = ?, qty = ? WHERE id = ?', values, (err, result) => {
        if (err) return res.status(500).send({ error: 'Error updating product' });
        if (result.affectedRows === 0) return res.status(404).send({ error: 'Product not found' });
        res.status(200).send({ message: 'Product updated successfully' });
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM product WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send({ error: 'Error deleting product' });
        if (result.affectedRows === 0) return res.status(404).send({ error: 'Product not found' });
        res.status(200).send({ message: 'Product deleted successfully' });
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});