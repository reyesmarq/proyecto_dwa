document.addEventListener('DOMContentLoaded', e => {
  let ProductosContainer = document.getElementById('productosContainer');
  ProductosContainer.addEventListener('click', e => {
    // if the click was on the redirect Url
    if (e.target.id === 'productoUrl') return;
    debugger
    // Valida si el click no trae metadata, para no efectuar agregar al carrito
    if (
      !e.target.dataset['productId'] ||
      !e.target.dataset['productImageUrl'] ||
      !e.target.dataset['productDescription'] ||
      !e.target.dataset['productPrice']
    )
      return;

    let Alert = document.getElementById('alert');

    let product = {
      id: e.target.dataset['productId'],
      imageUrl: `${e.target.dataset['productImageUrl']}`,
      description: e.target.dataset['productDescription'],
      quantity: 1,
      price: e.target.dataset['productPrice'],
    };

    // Agregar producto al carrito
    agregarProductoACarrito(product);

    // Si existe una notificacion, entonces ya no crear nodo y retornar.
    // Evita duplicado de notificaciones.
    // if (Alert) return;
    mostrarAlerta();
  });

  function mostrarAlerta() {
    let alertContainer = document.createElement('div');
    alertContainer.className =
      'alert alert-success alert-dismissible fade show alert zi:tooltip alert:fixed';
    alertContainer.setAttribute('id', 'alert');

    let container = document.createElement('div');
    container.className = 'container p-3';

    let alertText = document.createElement('strong');
    alertText.innerHTML = 'El producto se agrego con exito';

    let btnClose = document.createElement('button');
    btnClose.className = 'btn-close';
    btnClose.setAttribute('type', 'button');
    btnClose.setAttribute('data-bs-dismiss', 'alert');
    btnClose.setAttribute('aria-label', 'Close');

    container.appendChild(btnClose);
    container.appendChild(alertText);
    alertContainer.appendChild(container);
    document.body.appendChild(alertContainer);
  }

  function agregarProductoACarrito(product) {
    let productsExist = localStorage.getItem('checkout');
    console.log('product', product);
    if (!productsExist) {
      localStorage.setItem('checkout', JSON.stringify([]));
    }

    const products = JSON.parse(localStorage.getItem('checkout'));

    const mismoProducto = products.find(p => p.id == product.id);

    if (mismoProducto) {
      let productIndex = products.findIndex(p => p.id == product.id);

      products.splice(productIndex, 1, {
        ...mismoProducto,
        quantity: mismoProducto.quantity + 1,
      });

      localStorage.setItem('checkout', JSON.stringify([...products]));
      return;
    }

    localStorage.setItem('checkout', JSON.stringify([...products, product]));
    actualizarCarrito(products.length);
  }

  function actualizarCarrito(total) {
    let Carrito = document.getElementById('carrito');

    Carrito.innerHTML = `
      <span class="text-success h6">${total + 1}
      <i class="bi bi-cart pe-none"></i> | Comprar
      </span>
    `;
  }
});
