const express = require('express');
const cookie = require('cookie-parser')
const app = express()
const routes = require('./src/routes/index')
const cors = require('cors')
require('dotenv').config(); 
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')  


app.use(cookie())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(routes)  
app.use(cors())
app.listen(PORT , console.log(`App running on https://localhost:${PORT}`))