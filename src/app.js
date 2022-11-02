const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

const PORT = 3000
app.listen(PORT, () => console.log('escuchando en el puerto', PORT))

app.get('/', (req, res) => {
  // res.send('estoy en el home')
  res.render('index');
})

app.get('/carrito', (req, res) => {
  res.render('carrito')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/product-detail', (req, res) => {
  res.render('product-detail')
})

app.get('/registro', (req, res) => {
  res.render('registro')
})