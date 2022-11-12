const express = require('express');
const fs = require('fs');
const app = express();
var bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator')

//numero para bycript
const saltRounds = 10;

//usa la carpeta public para devolver el css de mi vista
app.use(express.static('public'));

//decirle a express que use body parser para que pueda interpretar el body que me tira la request
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

//asi devuelve mis vistas en ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//configuro mi puerto
const PORT = 3000
app.listen(PORT, () => console.log('escuchando en el puerto', PORT))

//renderizo mis vistas
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

//guardo user (email, contrasena, nombre y apellido)e incripto la contrasena
app.post("/registro",
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').notEmpty().isAlpha(),
  body('apellido').notEmpty().isAlpha(),
  (req, res) => {
    const { email, name, apellido, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          console.log(hash);
          if (err) {
            return res.status(400).json('Error al encryptar')
          } else {
            const usersFS = fs.readFileSync(__dirname + "/users.json", "utf-8");
            const usersParsed = JSON.parse(usersFS);
            console.log(usersFS, usersParsed);
            usersParsed.push({ username: name + ' ' + apellido, email, password: hash });
            fs.writeFileSync(__dirname + "/users.json", JSON.stringify(usersParsed));
            res.status(200).send("Felicidades has creado tu usuario")
          }
        });
      });
    }
  }
)

app.get('*', function(req, res){
  res.status(404).send('Pagina no encontrada');
});
