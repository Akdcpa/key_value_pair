const User = require('../models/Users')
var fs = require('fs');
const bycrypt = require('bcrypt'); 
const { response } = require('express');
const { json } = require('body-parser');
require('dotenv').config(); 
 
const getData = (req , res) =>{
    var file = req.body.path
    var data = fs.readFileSync(file);
    var words = JSON.parse(data);

    let result = []
    for(var i in words){ 
        let def = words[i]["timestamp"];
        if(def==0 || new Date().getTime()<=def){
            result.push([i,words[i]])
        }
     }

    console.log("Mofdified",result)
    return JSON.stringify(words);
}

const addWord = (req,res) =>{ 
    
    var file = req.body.path
    var key = req.body.key;
    var value = req.body.value;
    var timestamp = req.body.timestamp;
    // var date = req.body.date;
    
    var data = fs.readFileSync(file);
    var words = JSON.parse(data);

    if(words[key]!=null){ 
    
        r = {
            key:key, 
            status:"failed",
            msg:"Key already exists"
        }
    
        return JSON.stringify(r);
    }
    else{
        words[key] = {
            "data":value,
            // "date":date,
            "timestamp":timestamp
        }
        var data = JSON.stringify(words,null,2)

        function finished(err){
            console.log("Set")
        }
        fs.writeFile(file,data,finished);

        r = {
            key:key,
            value:value,
            status:"success",
            msg:"Data added successfylly"
        }

        return JSON.stringify(r);
    }
    
}
 
const deleteWord = (req,res) =>{
    
    var file = req.body.path
    var data = fs.readFileSync(file);
    var words = JSON.parse(data);
    
    var key = req.body.key; 

    if(words[key]!=null){

        delete words[key];
        var data = JSON.stringify(words,null,2)

        function finished(err){
            console.log("Set")
        }
        fs.writeFile(file,data,finished);

        r = {
            key:key, 
            status:"success",
            msg:"Data Deleted successfylly"
        }
        
        return JSON.stringify(r);
    }

    else{
        r = {
            key:key, 
            status:"failed",
            msg:"Key does not exists"
        }
    
        return JSON.stringify(r);
    }
}
 

const checkPath = (req,res) => {
    var path = req.body.path

    console.log("Path node",path)
 
    try {
        if (fs.existsSync(path)) { 
          console.log("File Exists")
          process.env["FILE"] = path;
          return JSON.stringify({
              "status":"success",
              "msg":"file exists"
          })
        }
      } 
      catch(err) {
        console.error(err)
        return JSON.stringify(err)
      }
    return JSON.stringify({
        "msg":path+" "+"File does not exists",
        "status":"fail"
    })
}

const chooseRandom = (req,res) =>{
        var dictstring = JSON.stringify({}); 
        fs.writeFileSync("../test.json",dictstring,all)
        function all(err){
            console.log("Logging")
        }

        return JSON.stringify({
            "msg":"created",
            "status":"success",
            "path":"../test.json"
        })
}
 
module.exports = {
    getData, 
    addWord,
    deleteWord,
    checkPath,
    chooseRandom
}
