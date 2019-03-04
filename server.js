const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mainRoutes = require('./routes/main');
const app = express();

app.use(mainRoutes);
mongoose.connect('mongodb://prasad18:prasad18@ds357955.mlab.com:57955/product',{ useNewUrlParser: true },()=>{
    console.log('successfully connected!!!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

app.listen(8080, function() {
    console.log('Node.js listening on port ' + 8080)
})