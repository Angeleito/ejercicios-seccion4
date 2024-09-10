// Obtener productos del LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Guardar productos en el LocalStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Agregar producto al carrito
function addToCart(id) {
    const products = document.querySelectorAll('.product');
    let product;
    products.forEach(p => {
        if (p.dataset.id == id) {
            product = {
                id: p.dataset.id,
                name: p.dataset.name,
                price: parseFloat(p.dataset.price),
                quantity: 1
            };
        }
    });

    let cart = getCart();
    const existingProduct = cart.find(p => p.id == id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    saveCart(cart);
    renderCart();
}

// Renderizar el carrito
function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    let total = 0;
    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = `${product.name} - $${product.price} x ${product.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(product.id);
        productElement.appendChild(removeButton);
        cartContainer.appendChild(productElement);
        total += product.price * product.quantity;
    });

    document.getElementById('total').textContent = total;
}

// Eliminar producto del carrito
function removeFromCart(id) {
    let cart = getCart();
    const productIndex = cart.findIndex(product => product.id == id);
    if (productIndex > -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    saveCart(cart);
    renderCart();
}

// Vaciar el carrito
function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', renderCart);