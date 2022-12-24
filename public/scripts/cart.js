let products = [
  {
    "id": 4,
    "nombre": "Orquidea Arundina",
    "descripcion": "Una orquídea arundina es una variedad de orquídea que se caracteriza por sus flores grandes y vistosas. Esta orquídea también se conoce como orquídea de lirio de luna, debido a la forma de sus flores, que recuerda a la de un lirio. Esta orquídea es originaria de la selva tropical de América Central y del Sur, donde se encuentra comúnmente en los árboles. Esta es una de las orquídeas más populares para los jardines de interiores.",
    "foto": "assets/Peristeria-elata.jpg",
    "precio": 1600,
    "quantity": 3,
  },
  {
    "id": 5,
    "nombre": "Orquidea Diuris",
    "descripcion": "Una orquídea Diuris es una variedad de orquídea originaria de Australia. Esta orquídea se caracteriza por sus flores grandes y coloridas con una forma de campana. Estas flores tienen un tono amarillo pálido con una franja de color rosa y púrpura. Esta orquídea es una epífita, lo que significa que crece en la corteza de los árboles y no en el suelo. Esta orquídea se encuentra comúnmente en los bosques templados de Australia.",
    "foto": "assets/Diuris.jpg",
    "precio": 1500,
    "quantity": 2,
  }
]; // INITIAL VALUE IS LOCALSTORAGE

function renderProducts() {
  console.log(window.localStorage.getItem('cart'));
  const myNode = document.querySelector("#carrito");
  myNode.innerHTML = "";

  // RENDER PRODUCTS
  products.forEach((product) => {
    const container = document.createElement('div');
    container.classList.add('cart-article');
    const image = document.createElement('img');
    image.classList.add('img-cart');
    image.setAttribute('src', product.foto);
    const name = document.createElement('h3');
    name.classList.add('article-name');
    name.textContent = product.nombre;
    const price = document.createElement('p');
    price.textContent = "$ " + product.precio;
    const buttonSum = document.createElement('button');
    buttonSum.addEventListener('click', () => sumProduct(product.id));
    buttonSum.textContent = "+";
    const quantity = document.createElement('p');
    quantity.textContent = product.quantity;
    const buttonSubstract = document.createElement('button');
    buttonSubstract.addEventListener('click', () => substractProduct(product.id));
    buttonSubstract.textContent = "-";
    container.appendChild(image);
    container.appendChild(name);
    container.appendChild(price);
    container.appendChild(buttonSum);
    container.appendChild(quantity);
    container.appendChild(buttonSubstract);
    myNode.appendChild(container);
  });

  // RENDER CART
  const cartBuy = document.createElement('div');
  cartBuy.classList.add('cart-buy');
  const total = document.createElement('p');
  const totalPrice = products.reduce((total, current) => current.precio * current.quantity + total, 0);
  total.textContent = "Total: $" + totalPrice;
  const buttonPay = document.createElement('button');
  buttonPay.addEventListener('click', () => window.location.href = 'login');
  buttonPay.textContent = "PAGAR";
  buttonPay.classList.add('buy');
  const buttonDelete = document.createElement('button');
  buttonDelete.addEventListener('click', () => deleteAllProducts());
  buttonDelete.textContent = "Vaciar carrito";
  buttonDelete.classList.add('buy');
  cartBuy.appendChild(total);
  cartBuy.appendChild(buttonPay);
  cartBuy.appendChild(buttonDelete);
  myNode.appendChild(cartBuy);
}

function deleteAllProducts() {
  window.localStorage.clear();
  products = [];
  renderProducts();
}

function sumProduct(id) {
  products.map((product) => {
    if (product.id === id) {
      product.quantity++;
    }
    return product;
  });
  renderProducts();
}

function substractProduct(id) {
  products.map((product) => {
    if (product.id === id) {
      if (product.quantity === 1) {
        // BORRAR PRODUCT
      } else {
        product.quantity--;
      }
    }
    return product;
  });
  renderProducts();
}

renderProducts();