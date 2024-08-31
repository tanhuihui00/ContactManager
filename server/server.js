const mongoose = require('mongoose')
const express = require("express")
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

const contactRoutes = require('./routes/contacts')

dotenv.config({path : './config.env'})

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("Connected to MongoDB")).catch((error) => console.log("MongoDB connection error:", error))

// Routes
app.use('/', contactRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname+'/dist/'));
    app.get('*', (req,res) => {
        res.sendFile(__dirname+'/dist/index.html');
    })
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port ', PORT));