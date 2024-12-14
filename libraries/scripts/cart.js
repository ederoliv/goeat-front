var cart = [];

// FUNÇÕES DO CARRINHO
function addCartItem(productName, productPrice, productQuantity) {

    if(cart.length === 0) createCartNavbar();


    updateCart(productName, productPrice, productQuantity);
    updateCartNavbar();

}

function removeCartItem(){
    //remove
}

function updateCart(productName, productPrice, productQuantity){

    let productIsOnCart = false;
    let cartProductIndex = 0;

    for(i = 0; i < cart.length; i++){

        if(productName == cart[i].name){
            productIsOnCart = true;
            cartProductIndex = i;
        }
    }

    if(productIsOnCart === true){
        cart[cartProductIndex].quantity += (productQuantity - cart[cartProductIndex].quantity);
    } else {
        cart.push({ name: productName, price: productPrice, quantity: productQuantity});
    }
}

function calculateCartTotalPrice(clientCart) {

    let totalPrice = 0;

    for (let i = 0; i < clientCart.length; i++) {
 
        totalPrice += clientCart[i].price * clientCart[i].quantity;
      }

    return totalPrice;
}

function calculateCartTotalItems(clientCart) {

    let totalItems = 0;
    
    for (let i = 0; i < clientCart.length; i++) {
      totalItems += clientCart[i].quantity;
    }

    return totalItems;
}

function updateCartNavbar() {

    const cartInfo = document.getElementById('cart-info');
    
    let totalPrice = calculateCartTotalPrice(cart);
    let totalItems = calculateCartTotalItems(cart);
    cartInfo.textContent = `Carrinho: ${totalItems} itens | Total: R$ ${totalPrice}`;
}


function createCartNavbar() {
    const cartNavbar = document.createElement('div');
    cartNavbar.id = 'cart-navbar';

    const cartInfo = document.createElement('p');
    cartInfo.id = 'cart-info';
    
    cartNavbar.appendChild(cartInfo);
    document.body.appendChild(cartNavbar);

    cartNavbar.addEventListener('click', () => {
        
        loadCart();
        
      });
}

function loadCart() {

    //criando os elemntos do modal
    const container = document.getElementById('container');

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    const cartTitle = document.createElement("h2");
    
    const closeButton = document.createElement("button");
    closeButton.className = "close-button fa fa-times";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";

    const totalPedido = document.createElement("button");
    totalPedido.className = "cancel-button";

    const saveButton = document.createElement("button");
    saveButton.className = "save-button";


    //atribuindo valores, textos aos elementos etc.
    cartTitle.innerText = "Seu carrinho";

    const lastPrice = calculateCartTotalPrice(cart);
    totalPedido.innerText = `Total do pedido: R$ ${lastPrice}`;
    

    saveButton.innerText = "Fazer Pedido";


    //carrega item por item do carrinho
    cart.map((item) => {
  
        const cartItemCard = document.createElement('div');
        cartItemCard.className = 'cart-item-card';
    
        const cardDetails = document.createElement('div');
        cardDetails.className = 'card-details';
    
        const image = document.createElement('img');
        image.className = 'cart-card-product-image';
    
        const divProductDetails = document.createElement('div');
        divProductDetails.className = 'cart-card-product-details';
    
        const productName = document.createElement('h2');
        productName.className = 'cart-card-product-name';
    
        const productPrice = document.createElement('p');
        productPrice.className = 'cart-card-product-price';
    
        const divQuantity = document.createElement('div');
        divQuantity.className = 'cart-card-div-quantity';
    
        const plusButton = document.createElement('button');
        plusButton.className = 'cart-card-quantity-button';
    
        const quantityField = document.createElement('input');
        quantityField.type = 'text';
        quantityField.className = 'cart-card-quantity-field';
    
        const minusButton = document.createElement('button');
        minusButton.className = 'cart-card-quantity-button';
    
        const removeItemButton = document.createElement('button');
        removeItemButton.className = 'remove-to-cart-button';
    
        const removeToCartButtonIcon = document.createElement('i');
        removeToCartButtonIcon.className = 'fa fa-trash fa-3x remove-to-cart-button-icon';
    
    
        
        cartItemCard.dataset.partnerId = item.id;
    
        image.src = `${root}${routes.assets}foods.png`;
        productName.innerText = item.name;
        productPrice.innerText = `R$ ${formatPrice(item.price)}`;
    
    
        minusButton.innerText = '-';
        quantityField.value = item.quantity;
        plusButton.innerText = '+';
    
                    
    removeItemButton.appendChild(removeToCartButtonIcon);
    
    divQuantity.append(minusButton, quantityField, plusButton);
    
    divProductDetails.append(productName, productPrice);
    
    cardDetails.append(image, divProductDetails, divQuantity);
    
    cartItemCard.append(cardDetails, removeItemButton);
    
    modalContent.appendChild(cartItemCard);


    
    //Eventos
    
    plusButton.addEventListener('click', () => {
        quantityField.value = parseInt(quantityField.value) + 1;

        item.quantity = quantityField.value;

        const last = calculateCartTotalPrice(cart);
        totalPedido.innerText = `Total do pedido: R$ ${last}`;

    });
    
            
    minusButton.addEventListener('click', () => {
        const newQuantity = Math.max(0, parseInt(quantityField.value) - 1);
        quantityField.value = newQuantity;
        
        if (newQuantity === 0) {
            cart = cart.filter(cartItem => cartItem !== item); // Remove o item do array
            cartItemCard.remove(); // Remove o item do DOM

            if(cart.length === 0){
                const existingOverlay = document.querySelector('.overlay');
                    if (existingOverlay) {
                    existingOverlay.remove();
                }
            }

        } else {
            item.quantity = newQuantity;
        }
        
        const last = calculateCartTotalPrice(cart);
        totalPedido.innerText = `Total do pedido: R$ ${last}`;
    });
    
    
    removeItemButton.addEventListener('click', () => {
        cart = cart.filter(cartItem => cartItem !== item); // Remove o item do array
        cartItemCard.remove(); // Remove o elemento do DOM
        if(cart.length === 0){
            const existingOverlay = document.querySelector('.overlay');
                if (existingOverlay) {
                existingOverlay.remove();
            }
        }else{
            last = calculateCartTotalPrice(cart);
            totalPedido.innerText = `Total do pedido: R$ ${last}`;
        }

    });
    
  
  });

    //atrelando os elementos filhos aos elementos pais

    modalFooter.append(totalPedido, saveButton);

    modalHeader.append(cartTitle, closeButton);

    modal.append(modalHeader, modalContent, modalFooter);

    overlay.appendChild(modal);

    container.appendChild(overlay);

    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
      });
}