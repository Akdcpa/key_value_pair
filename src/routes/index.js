const express  = require('express');
const router = express.Router(); 
const {
    getData,
    addWord,
    deleteWord,
    chooseRandom,
    checkPath
} = require('../actions/actions')

var fs = require('fs')

router.post('/api/get' , (req , res)=>{
    res.send(getData(req,res))
}) 

router.post('/api/add' , (req , res)=>{
    res.send(addWord(req,res))
})  

router.post('/api/delete' , (req , res)=>{
    res.send(deleteWord(req,res))
}) 

router.post('/api/checkPath',(req,res)=>{ 
    res.send(checkPath(req,res))
})
 
router.get('/api/choose/file',(req,res)=>{
    res.send(chooseRandom(req,res))
})

module.exports = router;