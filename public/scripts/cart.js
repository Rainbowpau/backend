let products = JSON.parse(window.localStorage.getItem('cart')); // INITIAL VALUE IS LOCALSTORAGE

function renderProducts() {
  window.localStorage.setItem("cart", JSON.stringify(products));
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
    buttonSum.classList.add('add');
    const quantity = document.createElement('p');
    quantity.textContent = product.quantity;
    const buttonSubstract = document.createElement('button');
    buttonSubstract.addEventListener('click', () => substractProduct(product.id));
    buttonSubstract.textContent = "-";
    buttonSubstract.classList.add('add');
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