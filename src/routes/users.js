const express  = require('express');

const router = express.Router();

router.get('/' , (req , res)=>{
    res.send(`Hello`)
})

router.post('/register' , (req , res)=>{
    console.log(req.body)
    res.send("Hello")
})
module.exports = router;