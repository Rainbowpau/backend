const express = require ('express')
const app = express ()

const PORT = 3000
app.listen(PORT, ()=> console.log('escuchando en el puerto', PORT))

app.get('/index', (req , res) => {
  res.send('estoy en el home')
} )

app.get('/carrito', (req , res) => {
  res.send('estoy en el carrito')
} )

app.get('/login', (req , res) => {
  res.send('estoy en el login')
} )

app.get('/product-detail', (req , res) => {
  res.send('estoy en producto')
} )

app.get('/registro', (req , res) => {
  res.send('estoy en el registro')
} )