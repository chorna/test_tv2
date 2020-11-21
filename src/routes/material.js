const express = require('express');
const router = express.Router();

const Material = require('../models/Material');


router.get('/', async (req, res) => {
    const materials = await Material.find();
    res.json(materials)
});



  router.post('/', async (req, res) => {
    console.log(req.post)
    console.log(req.body)
    const material = new Material(req.body);
    await material.save();
    res.json({
      status: 'Mat saved'
    });
  });

  router.put('/:id', async (req, res) => {
    await Material.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      status: 'Mat Updated'
    });
  });
  
  router.delete('/:materialId', async (req, res) => {
    console.log(req.params)
    await Material.findByIdAndRemove(req.params.materialId);
    res.json({
      status: 'Material deleted'
    });
  });

module.exports = router;