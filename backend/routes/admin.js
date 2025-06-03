const Admin = require('../models/admin'); // ✅ correct
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.get(`/`, async (req, res) =>{
    const adminList = await Admin.find().select('-passwordHash');
    if(!adminList) {
        res.status(500).json({success: false})
    } 
    res.send(adminList);
})



// ✅ POST /admin/google-login
router.post('/google-login', async (req, res) => {
  const { email, name } = req.body;

  if (!email) return res.status(400).json({ message: "Missing email" });

  let admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(403).json({ message: "Not an authorized admin" });
  }

  return res.status(200).json({ admin });
});


    
router.post(`/`, async (req, res) =>{
    let admin = new Admin({
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
    })
    admin = await admin.save();
    if(!admin) 
    return res.status(500).send('The Admin cannot be created')

    res.send(admin);
})



    





module.exports =router;