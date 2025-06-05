const {Admin} = require('../models/admin'); // ✅ correct
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


router.post('/login', async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  const secret = process.env.secret;

  if (!admin || !admin.passwordHash) {
    return res.status(400).send('Admin not found or missing password.');
  }

  const isMatch = bcrypt.compareSync(req.body.password, admin.passwordHash);
  if (!isMatch) {
    return res.status(400).send('Password is wrong!');
  }

  const token = jwt.sign(
    {
      adminemail: admin.email,
      isAdmin: admin.isAdmin
    },
    secret,
    { expiresIn: '1d' }
  );

  return res.status(200).send({ admin: admin.email, token });
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