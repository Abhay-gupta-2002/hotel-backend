const express = require('express')

const app = express();
const db=require('./db');
require('dotenv').config();
const passport=require('./auth');

// const Person=require('./models/Person');
// const MenuItem=require('./models/MenuItem');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT||3000;
const logRequest=(req,res,next)=>{
  console.log(`${new Date().toLocaleString()} Request made to :${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false});
app.get('/',localAuthMiddleware,function (req, res){
  res.send('this is list of menu');
})
const menuRoutes=require('./routes/menuRoutes');
const personRoutes=require('./routes/personRoutes');
const Person = require('./models/Person');
app.use('/menu',localAuthMiddleware,menuRoutes);
app.use('/person',localAuthMiddleware,personRoutes);

app.listen(PORT,()=>{console.log("server is listening")})