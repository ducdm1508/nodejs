const express = require('express');
const app = express();
const port = 3000;
const mySql = require('mysql2');
const fs = require('fs');

const logStream = fs.createWriteStream('log.txt', { flags: 'a' });

const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'products',
    port: 3306
});

app.use(express.json());

const getTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    return `${date} ${time}`;
};

const logSucess = (data) => {
    logStream.write(`[${getTime()}] ${data}\n`);
    console.log(`${data}`);
};

const logError = (data) => {
    logStream.write(`[${getTime()}] ${data}\n`);
    console.log(`${data}`);
};

app.use((req, res, next) => {
    const logRequest = `Method: ${req.method} | URL: ${req.originalUrl}`;
    logSucess(logRequest);
    next();
});

db.connect((err) => {
    if (err) {
        logError(`Connection failed: ${err}`);
        return;
    }
    logSucess(`Connection successful`);
});

class product {
    constructor(title, price, iDate, qty) {
        this.title = title;
        this.price = price;
        this.iDate = iDate;
        this.qty = qty;
    }
}

app.post('/products', (req, res) => {
    const { title, price, iDate, qty } = req.body;
    const sql = 'INSERT INTO product (title, price, iDate, qty) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, price, iDate, qty], (err, result) => {
        if (err) {
            logError(`Error inserting product: ${err}`);
            return res.status(404).send({ error: 'Error inserting product' });
        }
        logSucess(`Product inserted successfully: ${JSON.stringify({ productId: result.insertId })}`);

        res.status(201).send({ message: 'Product inserted successfully', productId: result.insertId });
    });
});

app.use((err, req, res, next) => {
    const errorMessage = `${req.method} ${req.originalUrl}`;
    logError(errorMessage);
});

app.listen(port, () => {
    logSucess(`Server is running on port http://localhost:${port}`);
});
