const express = require ('express')
const app = express ()

const PORT = 3000
app.listen(PORT, ()=> console.log('escuchando en el puerto', PORT))

app.get('/home', (req , res) => {
  res.send('estoy en el home')
} )