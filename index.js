const express = require('express')
const app = express();
const db=require('./db');
require('dotenv').config();
const PORT=process.env.PORT||3000;
const Person=require('./models/Person');
const MenuItem=require('./models/MenuItem');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('this is list of menu')
})
const menuRoutes=require('./routes/menuRoutes');
const personRoutes=require('./routes/personRoutes');
app.use('/menu',menuRoutes);
app.use('/person',personRoutes);

app.listen(PORT,()=>{console.log("server is listening")})