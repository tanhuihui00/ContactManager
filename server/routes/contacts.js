const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

// Get all contacts
router.get('/api/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// find contact(s)
/*
router.get('/api/contacts/:name', async (req, res) => {
  try {
    const contact = await Contact.find({name: new RegExp(req.params.name, 'i')}).exec();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/

router.post('/api/contacts/add', async (req, res) => {
  try{
    const newContact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    });
    await newContact.save();
    res.json(newContact);
  }catch (err){
    res.status(500).json({ message: err.message });
  }
})

router.put('/api/contacts/edit/:id', async (req, res) => {
  try{
    const updatedContact = {name: req.body.name, phone: req.body.phone, email: req.body.email};
    const contact = await Contact.findByIdAndUpdate(req.params.id, updatedContact, {
      new: true
    });
    res.json(contact);
  }catch (err){
    res.status(500).json({ message: err.message });
  }
})

router.delete('/api/contacts/delete/:id', async (req, res) => {
  try{
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    res.json(deletedContact);
  }catch (err){
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;