const mongoose = require('mongoose')
const express = require("express")
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

const contactRoutes = require('./routes/contacts')

dotenv.config({path : './config.env'})

// Middleware
// middleware
const corsOptions = {
    origin: "https://contactmanager-1-bprx.onrender.com/",
}
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("Connected to MongoDB")).catch((error) => console.log("MongoDB connection error:", error))

// Routes
app.use('/', contactRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server running on port ', PORT));