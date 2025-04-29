document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.querySelector('.nav-toggle');
  const nav  = document.querySelector('.main-nav');
  btn && nav && btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    btn.classList.toggle('open');
  });

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name  = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const img   = button.dataset.img; // <— critical!!

      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const item = cart.find(i => i.name === name);
      if (item) {
        item.qty++;
      } else {
        cart.push({ name, price, qty: 1, img }); // <— critical!!
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${name} added to cart!`);
    });
  });
});
