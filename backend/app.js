const express=require("express");
const morgan = require("morgan");
const dotenv=require("dotenv").config();
const app=express();
const homeRoute=require("./routes/home.js");
const loginRoute=require("./routes/user.js");
const connectDB=require("./db/db.js");
const { connect } = require("mongoose");
const redisclient=require("./services/redis.js");
const responseRoute=require("./routes/Response.js");
const cors=require("cors");
const itemroute=require("./routes/item.js")
const globalErrorHandler = require('./middlewares/GlobalErrorHandler.js')

app.listen(3000);

app.get('/error',(req,res,next)=>{
    throw new Error('Test error')
})

connectDB();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,              
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/",homeRoute);
app.use("/user",loginRoute);
app.use("/response",responseRoute);
app.use("/item",itemroute);

app.use(globalErrorHandler);

   






module.exports=app;