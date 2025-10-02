const express = require('express')
const app = express();
const db=require('./db');
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
app.listen(3000,()=>{console.log("server is listening")})