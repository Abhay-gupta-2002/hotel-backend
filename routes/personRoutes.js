const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // ✅ make sure you imported this

// Create new person
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' });
  }
})


// Get all persons
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// Get persons by work type
router.get('/work/:workType', async (req, res) => {
  try {
    const workType = req.params.workType.toLowerCase();

    if (['chef', 'manager', 'waiter'].includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log('response fetched');
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

// Update person by ID
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: 'person not found' });
    }

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal server error' });
  }
});

router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;
    const response=await Person.findOneAndDelete(personId);
    if(!response)return res.status(400).json({error:'person not found'});
    res.status(200).json({message:'person deleted successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})
module.exports = router;
