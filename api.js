require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


//Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/encrypt')
const subsRoute = require('./routes/subs')

//Connect Db
const db = mongoose.connection
mongoose.connect(process.env.Db_url,{useNewUrlParser:true}) 
db.on('open', ()=> console.log('Connected to database.'))   
db.once('error', (error)=> console.log(error))

//Middleware
app.use(express.json());                                    

//Routes middleware
app.use('/api/user',authRoute)
app.use('/api/post',postRoute)
app.use('/api/subs',subsRoute)

//Server start
app.listen(3000, ()=> console.log('Server started at 3000.'))
