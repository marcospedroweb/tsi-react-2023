const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
  'mongodb+srv://marcossenacsp:1324Senac@cluster0.d9kaynk.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db('Pizzaria');

async function insertElement() {
  const pizzas = db.collection('pizzas');
  const documents = [
    { nome: '3 Queijos', qtdPedacos: '8' },
    { nome: 'Baiana', qtdPedacos: '8' },
    { nome: 'Frango Catupiri', qtdPedacos: '8' },
    { nome: 'Calabresa', qtdPedacos: '8' },
  ];
  const result = await pizzas.insertMany(documents);
  let ids = result.insertedIds;
  console.log(ids);
  for (let id of Object.values(ids)) {
    console.log(`A pizza inserida foi: ${id}`);
  }
}

// insertElement();
async function getData() {
  const pizzas = await db.collection('pizzas').find({ nome: '4 Queijos' });
  for await (let pizza of pizzas) {
    console.log(pizza);
  }
}
// getData();

async function updateValue() {
  const pizzas = db.collection('pizzas');
  await pizzas.updateOne({ nome: '4 Queijos' }, { $set: { qtdPedacos: 12 } });
  getData();
}

// updateValue();
async function deleteData() {
  const pizzas = db.collection('pizzas');
  const pizza = await pizzas.findOne({ nome: '4 Queijos' });
  pizzas.deleteOne(pizza);
  getData();
}
deleteData();
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!',
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
