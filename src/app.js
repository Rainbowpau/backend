const express = require('express');
const fs = require('fs');
const app = express();
var bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const { body, validationResult } = require('express-validator')

//numero para bycript
const saltRounds = 10;

//usa la carpeta public para devolver el css de mi vista
app.use(express.static('public'));

//decirle a express que use body parser para que pueda interpretar el body que me tira la request
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// manipular las cookies
app.use(cookieParser());/* 
app.use((req, res, next) => {
  const cookie = req.cookies.boutiqueSessionLogued;
  if (req.url !== '/login' && !cookie) {
    res.redirect('/login');
  } else {
    next();
  }
}) */

//asi devuelve mis vistas en ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//configuro mi puerto
const PORT = 3000
app.listen(PORT, () => console.log('escuchando en el puerto', PORT))

//renderizo mis vistas
app.get('/', (req, res) => {
  const producstFS = fs.readFileSync(__dirname + "/products.json", "utf-8");
  const products = JSON.parse(producstFS);
  res.render('index', {products});
})

app.get('/carrito', (req, res) => {
  res.render('carrito');
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/product-detail-:id', (req, res) => {
  const producstFS = fs.readFileSync(__dirname + "/products.json", "utf-8");
  const products = JSON.parse(producstFS);
  const product = products.find(product => product.id.toString() === req.params.id)
  if (product) {
    res.render('product-detail', {product})
  } else {
    res.status(404).send('Pagina no encontrada');
  }
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

app.post("/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const usersFS = fs.readFileSync(__dirname + "/users.json", "utf-8");
      const usersParsed = JSON.parse(usersFS);
      const user = usersParsed.find((user) => user.email === email)
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result){
            res.cookie('boutiqueSessionLogued',true, { maxAge: 900000, httpOnly: true });
            return res.redirect('/');
          } else {
            return res.status(400).send("contrasena incorrecta")
          }
        });

      } else {
        return res.status(400).json('Ups no encontramos tu usuario')
      }
    }
  })

app.get('*', function (req, res) {
  res.status(404).send('Pagina no encontrada');
});
