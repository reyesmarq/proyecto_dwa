(() => {
  document.addEventListener('DOMContentLoaded', e => {
    let Carrito = document.getElementById('carrito');
    let total = localStorage.getItem('checkout')
      ? JSON.parse(localStorage.getItem('checkout')).length
      : 0;

    Carrito.innerHTML = `
      <span class="text-info h6 fw-bold">${total}
      <i class="bi bi-cart pe-none"></i> | Comprar
      </span>
    `;
  });
})();
