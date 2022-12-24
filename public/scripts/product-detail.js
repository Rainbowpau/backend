function addToCart(item) {
  let cart = window.localStorage.getItem('cart');
  console.log(cart, item, window);

  window.localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href='carrito'
}