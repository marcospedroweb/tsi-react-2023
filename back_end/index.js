const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri =
  'mongodb+srv://marcossenacsp:1324Senac@kartdb.emlgcmu.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const db = client.db('Database');
app.use(express.json());
const msgCategories = {
  getOne: 'Categoria retornada com sucesso',
  getMany: 'Categorias retornada com sucesso',
  delete: 'Categoria apagada com sucesso',
  update: 'Categoria atualizada com sucesso',
  create: 'Categoria criada com sucesso',
  getOneError: 'Nenhuma categoria encontrada',
  getManyError: 'Houve algum erro ao retornar os dados',
  deleteError: 'Houve algum erro ao apagar o dado',
  updateError: 'Houve algum erro ao atualizar o dado',
  createError: 'Houve algum erro ao criar o dado',
};
const msgProduct = {
  getOne: 'Produto retornada com sucesso',
  getMany: 'Produtos retornada com sucesso',
  delete: 'Produto apagada com sucesso',
  update: 'Produto atualizada com sucesso',
  create: 'Produto criada com sucesso',
  getOneError: 'Nenhuma Produto encontrada',
  getManyError: 'Houve algum erro ao retornar os dados',
  deleteError: 'Houve algum erro ao apagar o dado',
  updateError: 'Houve algum erro ao atualizar o dado',
  createError: 'Houve algum erro ao criar o dado',
};

app.get('/', (request, response) => {
  response.json({ mensagem: 'ola mundo!' });
});

// Get many
app.get('/categories', async (req, res) => {
  const result = await db.collection('categories').find().toArray();
  const categoriesArray = [];
  for await (let category of result) {
    categoriesArray.push(category);
  }
  if (categoriesArray) {
    res.status(200).json({
      message: msgCategories.getMany,
      categories: categoriesArray,
    });
  } else {
    res.status(500).json({
      message: msgCategories.getOneError,
      categories: null,
    });
  }
});

// Get one
app.get('/categories/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const category = await db.collection('categories').findOne(query);

  if (category) {
    res.status(200).json({
      message: msgCategories.getMany,
      categories: category,
    });
  } else {
    res.status(500).json({
      message: msgCategories.getManyError,
      categories: null,
    });
  }
});

// Delete
app.delete('/categories/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db
    .collection('categories')
    .deleteOne({ _id: new ObjectId(id) });

  if (result) {
    res.status(200).json({
      message: msgCategories.delete,
      categories: null,
    });
  } else {
    res.status(500).json({
      message: msgCategories.deleteError,
      categories: null,
    });
  }
});

// Update
app.put('/categories/:id', async (req, res) => {
  const json = req.body;
  const id = req.params.id;

  const category = await db
    .collection('categories')
    .findOne({ _id: new ObjectId(id) });
  if (!category) {
    res.status(200).json({
      message: msgCategories.updateError,
      categories: null,
    });
    return;
  }

  const result = await db
    .collection('categories')
    .updateOne(category, { $set: { name: json.name } });

  if (result) {
    res.status(200).json({
      message: msgCategories.update,
      categories: result,
    });
  } else {
    res.status(500).json({
      message: msgCategories.updateError,
      categories: null,
    });
  }
});

// Create
app.post('/categories', async (req, res) => {
  const { name } = req.body;
  const categories = await db.collection('categories');
  const category = { name };
  const result = await categories.insertOne(category);

  if (result) {
    res.status(200).json({
      message: msgCategories.create,
      categories: result,
    });
  } else {
    res.status(500).json({
      message: msgCategories.createError,
      categories: null,
    });
  }
});

//getMany
app.get('/products', async (req, res) => {
  const products = await db.collection('products').find();
  const productsArray = [];

  for await (let product of products) {
    const { name } = await db
      .collection('categories')
      .findOne({ _id: new ObjectId(product.category_id) });
    product.category_name = name;
    productsArray.push(product);
  }

  if (productsArray) {
    res.status(200).json({
      message: msgProduct.getMany,
      products: productsArray,
    });
  } else {
    res.status(500).json({
      message: msgProduct.getManyError,
      products: null,
    });
  }
});

//getOne
app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await db
    .collection('products')
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    res.status(200).json({
      message: 'Produto não encontrado',
      products: null,
    });
    return;
  }

  const { name } = await db
    .collection('categories')
    .findOne({ _id: new ObjectId(product.category_id) });
  product.category_name = name;

  if (product) {
    res.status(200).json({
      message: msgProduct.getMany,
      products: product,
    });
  } else {
    res.status(500).json({
      message: msgProduct.getManyError,
      products: null,
    });
  }
});

//Create
app.post('/products', async (req, res) => {
  const { name, number, position, category_id } = req.body;
  const products = await db.collection('products');
  const product = {
    name,
    number,
    position,
    category_id: new ObjectId(category_id),
  };
  const result = await products.insertOne(product);
  if (result) {
    res.status(200).json({
      message: msgProduct.create,
      product: result,
    });
  } else {
    res.status(500).json({
      message: msgProduct.createError,
      product: result,
    });
  }
});

//Update
app.put('/products/:id', async (req, res) => {
  const id = req.params.id;
  const { name, number, position, category_id } = req.body;

  const product = await db
    .collection('products')
    .findOne({ _id: new ObjectId(id) });
  if (!product) {
    res.status(200).json({
      message: msgProduct.updateError,
      products: null,
    });
    return;
  }

  const result = await db.collection('products').updateOne(product, {
    $set: { name, number, position, category_id: new ObjectId(category_id) },
  });

  if (result) {
    res.status(200).json({
      message: msgProduct.update,
      product: result,
    });
  } else {
    res.status(500).json({
      message: msgProduct.updateError,
      product: result,
    });
  }
});

//Delete
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db
    .collection('products')
    .deleteOne({ _id: new ObjectId(id) });

  if (result) {
    res.status(200).json({
      message: msgProduct.delete,
      product: null,
    });
  } else {
    res.status(500).json({
      message: msgProduct.deleteError,
      product: null,
    });
  }
});

app.listen(3002, () => {
  console.log('Servidor online na porta 3002');
});
