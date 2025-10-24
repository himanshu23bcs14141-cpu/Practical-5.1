// server.js
const Product = require('./models/Product');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sksachinkumar4616_db_user:7HKF7Cu2ghm74X6p@cluster0.ojdpjzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).send({ error: 'Product not found' });
    res.send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send({ error: 'Product not found' });
    res.send({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
