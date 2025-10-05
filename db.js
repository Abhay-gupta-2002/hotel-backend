const mongoose=require('mongoose');
//const mongourl='mongodb://localhost:27017/hotels';
require('dotenv').config();
const mongourl=process.env.MONGODB_URL_LOCAL;
// const mongourl=process.env.MONGODB_URL;
mongoose.connect(mongourl);

const db=mongoose.connection;
db.on('connected',()=>{
console.log('connected to mongodb server');
});
db.on('disconnected',()=>{
console.log('disconnected to mongodb server');
});

db.on('error',(err)=>{
console.error(' mongodb server error');
});
module.exports=db;