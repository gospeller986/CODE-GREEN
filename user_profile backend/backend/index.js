require('dotenv').config() ;

const express = require('express') ;
const app = express() ;
const cors = require('cors') ;
const connection = require('./db') ;
const userRoutes = require('./routes/user_routes');
const authRoutes = require('./routes/auth');


//database connection 

connection() ;

// middle wares 

app.use(express.json()) ;
app.use(cors()) ;

// routes
 
 app.use('/api/users', userRoutes) ;
 app.use('/api/auth' , authRoutes) ;

const  port = process.env.PORT || 8000;

app.listen(port , ()=> {
    console.log(`The server is running on the PORT ${port}`) ;
} )