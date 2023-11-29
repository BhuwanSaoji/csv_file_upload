const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const {routes} = require("./routes")
const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL || 'mongodb://localhost:27017'
const COLLECTION_NAME = process.env.COLLECTION_NAME || "Users"
const PORT = process.env.PORT || "3000";

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());

// connecting to mongodb
mongoose.connect(`${MONGO_DB_CONNECTION_URL}/${COLLECTION_NAME}`);

app.listen(PORT, (err)=>{
    if(!err){
        console.log("Server started at: " , PORT);
    }else{
        console.error("Error")
    }
})


routes(app)

app.use((req, res, next)=>{
    res.status(404).send("404 Not Found")
    next()
})