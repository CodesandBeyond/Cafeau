document.addEventListener('DOMContentLoaded', () => {
    // Only run on the cart page
    const list = document.querySelector('.cart-list');
    if (!list) return;
  
    // Load or initialize cart from storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Render function to display cart items
    function renderCart() {
      list.innerHTML = '';
      let subtotal = 0;
  
      cart.forEach(item => {
        subtotal += item.price * item.qty;
        // Use stored image path or fallback naming convention
        const imgSrc = item.img || `img/${item.name.toLowerCase().replace(/\s+/g, '-')}.png`;
  
        const block = document.createElement('div');
        block.className = 'cart-item';
        block.innerHTML = `
          <a href="menu.html#${item.name.toLowerCase().replace(/\s+/g, '-')}
            " class="item-img-link">
            <img src="${imgSrc}" alt="${item.name}" class="item-image"/>
          </a>
          <div class="item-details">
            <a href="menu.html#${item.name.toLowerCase().replace(/\s+/g, '-')}
              " class="item-title">${item.name}</a>
          </div>
          <div class="item-controls">
            <button class="qty-btn" data-name="${item.name}" data-op="decrease">–</button>
            <span class="qty">${item.qty}</span>
            <button class="qty-btn" data-name="${item.name}" data-op="increase">+</button>
          </div>
          <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
          <button class="remove-btn" data-name="${item.name}" aria-label="Remove">&times;</button>
        `;
        list.appendChild(block);
      });
  
      // Update subtotal display and persist
      const totalEl = document.getElementById('grand-total');
      if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Initial render
    renderCart();
  
    // Handle quantity changes & removals via event delegation
    list.addEventListener('click', e => {
      const btn = e.target;
      const name = btn.dataset.name;
      if (!name) return;
  
      if (btn.matches('.qty-btn')) {
        const op = btn.dataset.op;
        cart = cart.map(i => {
          if (i.name === name) {
            i.qty = Math.max(1, i.qty + (op === 'increase' ? 1 : -1));
          }
          return i;
        });
        renderCart();
      }
  
      if (btn.matches('.remove-btn')) {
        cart = cart.filter(i => i.name !== name);
        renderCart();
      }
    });
  });
  