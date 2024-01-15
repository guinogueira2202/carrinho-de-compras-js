let shoppingCartItems = [];

function getProduct() {
    let product = document.getElementById('produto').value;
    let productData = product.split('-');
    let productQty = document.getElementById('quantidade').value;
    productData.push(productQty);
    return productData;
}

function getShoppingCart() {
    return document.getElementById('lista-produtos');
}

function addProductSection(productData) {
    let productSection = createElement('section', 'carrinho__produtos__produto', null);
    let productQty = createElement('span', 'texto-azul', productData[2] + 'x');
    let productName = createElement('span', null, productData[0]);
    let productPrice = createElement('span', 'texto-azul', productData[1]);

    productSection.appendChild(productQty);
    productSection.appendChild(document.createTextNode(' '));
    productSection.appendChild(productName);
    productSection.appendChild(document.createTextNode(' '));
    productSection.appendChild(productPrice);
    let shoppingCart = getShoppingCart();
    shoppingCart.appendChild(productSection);
}

function createElement(tagName, className, textContent) {
    let element = document.createElement(tagName);
    element.className = className || null;
    element.textContent = textContent || null;
    return element;
}

function resetProductQty() {
    let productQty = document.getElementById('quantidade');
    productQty.value = 1;
}

function calculateTotalPrice() {
    let subtotal = calculateSubtotal();
    let total = subtotal.reduce((total, subtotal) => total + subtotal, 0);
    return total;
}

function calculateSubtotal() {
    let subtotal = [];
    for (let i = 0; i < shoppingCartItems.length; i++) {
        let productPrice = shoppingCartItems[i][1];
        let productQty = shoppingCartItems[i][2];
        let parsedPrice = parseFloat(productPrice.replace('R$', '').replace(',', '.'));
        let result = parsedPrice * productQty;
        subtotal.push(result)
    }
    return subtotal;
}

function displayTotalPrice(totalPrice) {
    let totalPriceFormatted = `R$${totalPrice.toFixed(2).replace('.', ',')}`;
    document.getElementById('valor-total').textContent = totalPriceFormatted;
}

function addToCart() {
    let productData = getProduct();
    shoppingCartItems.push(productData);
    addProductSection(productData);
    let totalPrice = calculateTotalPrice();
    displayTotalPrice(totalPrice);
    resetProductQty();
}

function cleanCart() {
    let shoppingCart = getShoppingCart();
    while (shoppingCart.childElementCount > 0) {
        shoppingCart.removeChild(shoppingCart.firstChild);
    }
    shoppingCartItems = [];
    let zero = calculateTotalPrice();
    displayTotalPrice(zero);
}

function defineButton(elementId, eventFunction) {
    let button = document.getElementById(elementId);
    button.addEventListener('click', eventFunction);
}

defineButton('clean-button', cleanCart);
defineButton('add-button', addToCart);