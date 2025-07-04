const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  iDate: Date,
  qty: Number
});
const ProductModel = mongoose.model('Product', productSchema);

class Product {
  constructor(name, price, iDate, qty) {
    this.name = name;
    this.price = price;
    this.iDate = iDate;
    this.qty = qty;
  }
}

app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching products' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).send({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching product' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const { name, price, iDate, qty } = req.body;
    const newProduct = new Product(name, price, iDate, qty);

    const savedProduct = new ProductModel(newProduct);
    await savedProduct.save();

    res.status(201).send({ message: 'Product inserted successfully', productId: savedProduct._id });
  } catch (err) {
    res.status(500).send({ error: 'Error inserting product' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const { name, price, iDate, qty } = req.body;
    const updated = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, price, iDate, qty },
      { new: true }
    );
    if (!updated) return res.status(404).send({ error: 'Product not found' });
    res.status(200).send({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error updating product' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send({ error: 'Product not found' });
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting product' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
