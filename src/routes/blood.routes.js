const express = require('express');
const { donateBlood, hasDonatedBefore, getAll, updateBlood, deleteBlood } = require('../controller/blood.controller');
const router = express.Router();

router.post('/saveBloodsamples', donateBlood) 
router.get('/hasDonatedBefore/:id', hasDonatedBefore)
router.get('/getAllApplications', getAll)
router.put('/updateApplicationForm/:id', updateBlood)
router.delete('/deleteApplication/:id', deleteBlood)

module.exports = router;