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
const db = client.db('KartDriver');

app.get('/', (request, response) => {
  response.json({ mensagem: 'ola mundo!' });
});

// app.get('/categories', async (req, res) => {
//   const categories = db.collection('categories');
//   const documents = [
//     {
//       name: 'PMK',
//     },
//     {
//       name: 'PCK',
//     },
//     {
//       name: 'PJMK',
//     },
//     {
//       name: 'PJK',
//     },
//     {
//       name: 'PK',
//     },
//     {
//       name: 'PGK B',
//     },
//     {
//       name: 'PGK A',
//     },
//     {
//       name: 'PSK B',
//     },
//     {
//       name: 'PSK A',
//     },
//     {
//       name: 'PSSK',
//     },
//     {
//       name: 'PKI',
//     },
//   ];
//   const result = await categories.insertMany(documents);
//   if (result) {
//     res.status(200).json({
//       message: 'Piloto criado com sucesso!',
//       driver: result,
//     });
//   } else {
//     res.status(500).json({
//       message: 'Houve algum erro',
//       driver: result,
//     });
//   }
// });

app.get('/categories/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db
    .collection('categories')
    .findOne({ _id: new ObjectId(id) });

  if (result) {
    res.status(200).json({
      message: 'Categoria retornada com sucesso!',
      driver: result,
    });
  } else {
    res.status(500).json({
      message: 'Houve algum erro',
      driver: result,
    });
  }
});

app.delete('/categories/:id', async (req, res) => {
  const id = req.params.id;
  const category = await db
    .collection('categories')
    .findOne({ _id: new ObjectId(id) });
  const result = await category.deleteOne(category);

  if (result) {
    res.status(200).json({
      message: 'Categoria apagada com sucesso!',
      driver: null,
    });
  } else {
    res.status(500).json({
      message: 'Houve algum erro',
      driver: null,
    });
  }
});

app.put('/categories/:id', async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  const category = await db
    .collection('categories')
    .findOne({ _id: new ObjectId(id) });
  const result = await category.updateOne(category, {
    $set: { name },
  });

  if (result) {
    res.status(200).json({
      message: 'Categoria atualizada com sucesso!',
      driver: result,
    });
  } else {
    res.status(500).json({
      message: 'Houve algum erro',
      driver: null,
    });
  }
});

app.get('/drivers', async (req, res) => {
  const drivers = await db.collection('drivers').find();
  const driversArray = [];
  for await (let driver of drivers) {
    driversArray.push(driver);
  }
  res.status(200).json({
    message: 'Piloto retornado com sucesso!',
    driver: driversArray,
  });
});

app.post('/drivers', async (req, res) => {
  const { name, number, position, category_id } = req.body;
  const drivers = await db.collection('drivers');
  const driver = {
    name,
    number,
    position,
    category_id,
  };
  const result = await drivers.insertOne(driver);
  if (result) {
    res.status(200).json({
      message: 'Piloto criado com sucesso!',
      driver: result,
    });
  } else {
    res.status(500).json({
      message: 'Houve algum erro',
      driver: result,
    });
  }
});

async function insertDriver() {
  const drivers = db.collection('drivers');
  const driver = {
    id: 1,
    name: 'fulano',
    number: 20,
    position: 10,
    category_id: 1,
  };
  const result = await drivers.insertOne(driver);
  console.log(result);
}

app.listen(3002, () => {
  console.log('Servidor online na porta 3002');
});
