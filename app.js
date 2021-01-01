const express = require('express'); 
const app = express()
const routes = require('./src/routes/index') 
const bodyParser = require('body-parser')
const morgan = require("morgan")  
const path = require("path")
require('dotenv').config(); 
const PORT = process.env.PORT || 5000 

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers',"Origin, X-requested-With, Content-Type, Accept, Authorization")
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH')
        return res.status(200).json({});
    }
    next();
});

app.use(routes)   
app.listen(PORT , console.log(`App running on https://localhost:${PORT}`))