const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

//Routes

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/' , (req, res) => {
  Item.find({})
      .select('name date')
      .sort( { date: -1 } ) //Sort descending
      .then(items => res.json(items))
      .catch(err => console.log(err));
});

// @route   POST api/items
// @desc    Create an item
// @access  Public
router.post('/' , (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    origin: req.body.origin,
    price: req.body.price,
    quantity: req.body.quantity
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items
// @desc    Delete an item
// @access  Public
router.delete('/:id' , (req, res) => {
  Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
});

// @route GET api/items
// @desc  Get an item by id
// @access Public
router.get('/:id', (req, res) => {
  Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/items
// @desc  Update an item
// @access Public
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    }
  )
  .then(item => res.json(item))
  .catch(err => console.log(err));
});

module.exports = router;