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
const db = client.db('TaskDatabase');
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: /https?:\/\/(www\.)?seu-site\.com/,
  }),
);

const msgTask = {
  getOne: 'Tarefa retornada com sucesso',
  getMany: 'Tarefas retornada com sucesso',
  delete: 'Tarefa apagada com sucesso',
  update: 'Tarefa atualizada com sucesso',
  create: 'Tarefa criada com sucesso',
  getOneError: 'Nenhuma Tarefa encontrada',
  getManyError: 'Houve algum erro ao retornar os dados',
  deleteError: 'Houve algum erro ao apagar o dado',
  updateError: 'Houve algum erro ao atualizar o dado',
  createError: 'Houve algum erro ao criar o dado',
};

app.get('/', (request, response) => {
  response.json({ mensagem: 'ola mundo!' });
});

// Get many
app.get('/tasks', async (req, res) => {
  const result = await db.collection('tasks').find().toArray();
  const tasksArray = [];
  for await (let task of result) {
    tasksArray.push(task);
  }
  if (tasksArray) {
    res.status(200).json({
      message: msgTask.getMany,
      tasks: tasksArray,
    });
  } else {
    res.status(500).json({
      message: msgTask.getOneError,
      tasks: null,
    });
  }
});

// Get one
app.get('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const task = await db.collection('tasks').findOne(query);

  if (task) {
    res.status(200).json({
      message: msgTask.getMany,
      tasks: task,
    });
  } else {
    res.status(500).json({
      message: msgTask.getManyError,
      tasks: null,
    });
  }
});

// Delete
app.delete('/tasks/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db
    .collection('tasks')
    .deleteOne({ _id: new ObjectId(id) });

  if (result) {
    res.status(200).json({
      message: msgTask.delete,
      tasks: null,
    });
  } else {
    res.status(500).json({
      message: msgTask.deleteError,
      tasks: null,
    });
  }
});

// Update
app.put('/tasks/:id', async (req, res) => {
  const { name, concluded } = req.body;
  const id = req.params.id;

  const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
  if (!task) {
    res.status(200).json({
      message: msgTask.updateError,
      tasks: null,
    });
    return;
  }

  const result = await db
    .collection('tasks')
    .updateOne(task, { $set: { name, concluded } });

  if (result) {
    res.status(200).json({
      message: msgTask.update,
      tasks: result,
    });
  } else {
    res.status(500).json({
      message: msgTask.updateError,
      tasks: null,
    });
  }
});

// Create
app.post('/tasks', async (req, res) => {
  const { name } = req.body;
  const tasks = await db.collection('tasks');
  const task = { name, concluded: false };
  const result = await tasks.insertOne(task);

  if (result) {
    res.status(200).json({
      message: msgTask.create,
      tasks: result,
    });
  } else {
    res.status(500).json({
      message: msgTask.createError,
      tasks: null,
    });
  }
});

app.listen(3002, () => {
  console.log('Servidor online na porta 3002');
});
