const {Feedback} = require('../models/feedback');
const express = require('express');
const router = express.Router();
const auth = require('../helpers/jwt');

// vendoremail  useremail  name  feedback

router.get(`/`,  async (req, res) =>{
    const feedbackList = await Feedback.find();

    if(!feedbackList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(feedbackList);
})


    
router.get(`/:id`, async (req, res) =>{
    const feedbackList = await Feedback.findById(req.params.id);
    if(!feedbackList) {
        res.status(500).json({success: false})
    } 
    res.send(feedbackList);
})

router.post('/',  auth, async (req,res)=>{
   let feedback = new Feedback({
  useremail: req.body.useremail,
  name: req.body.name,
  feedback: req.body.feedback,
  image: Array.isArray(req.body.image) ? req.body.image : [req.body.image], // ✅ ensure it's always an array
  course: req.body.course,
  dateCreated: req.body.dateCreated,
  userFeedbackdateCreated: req.body.userFeedbackdateCreated || new Date().toISOString(),
  status: req.body.status || "Pending",
});

    feedback = await feedback.save();

    if(!feedback)
    return res.status(400).send('the feedback cannot be created!')
    res.send(feedback);
    
})

router.put('/:id', auth, async (req, res) => {
  const updated = await Feedback.findByIdAndUpdate(
    req.params.id,
    {
      explanation: req.body.explanation,
      adminFeedbackdateCreated: req.body.adminFeedbackdateCreated,
    },
    { new: true }
  );
  if (!updated) return res.status(404).send("Feedback not found");
  res.send(updated);
});


router.put('/update-status/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({ message: "Failed to update status" });
  }
});



module.exports =router;
