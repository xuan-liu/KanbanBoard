const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Cards
router.get('/', async (req, res) => {
  const cards = await loadCardsCollection();
  res.send(await cards.find({}).toArray());
});

// Add Card
router.post('/', async (req, res) => {
  const cards = await loadCardsCollection();
  await cards.insertOne({
    name: req.body.name,
    education: req.body.education,
    contact: req.body.contact,
    status: 'Applied'
  });
  res.status(201).send();
});

// Update Card
router.put('/:id', async (req, res) => {
    const cards = await loadCardsCollection();
    const query = { _id: new mongodb.ObjectID(req.params.id) }
    await cards.updateOne(query, {$set: {status: req.body.status}});
    res.status(201).send();
});

// Show Card Detail
router.get('/:id', async (req, res) => {
    const cards = await loadCardsCollection();
    const query = { _id: new mongodb.ObjectID(req.params.id) }
    res.send(await cards.findOne(query, {}));
  });


// Delete Card
router.delete('/:id', async (req, res) => {
  const cards = await loadCardsCollection();
  await cards.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send({});
});

async function loadCardsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://Xuan:lx123456@kanbanboard.2y3gx.mongodb.net/KanbanBoard?retryWrites=true&w=majority',
    {
      useNewUrlParser: true
    }
  );

  return client.db('KanbanBoard').collection('cards');
}

module.exports = router;