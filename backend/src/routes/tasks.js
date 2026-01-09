const router = require('express').Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', async (req, res) => {
  res.json(await Task.find({ user: req.user.id }));
});

router.post('/', async (req, res) => {
  res.json(await Task.create({ ...req.body, user: req.user.id }));
});

router.put('/:id', async (req, res) => {
  res.json(await Task.findByIdAndUpdate(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
