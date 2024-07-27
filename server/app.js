require("dotenv").config();
const express = require("express")
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
require("./Models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const port = 8003;

//ith cors cheyyumbol

app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.json()); // nammude data

//ith cors cheyyumbol


//ith router ne

app.use(router);

//ith router ne

app.listen(port,()=>{
    console.log(`server is start port number ${port}`);
})