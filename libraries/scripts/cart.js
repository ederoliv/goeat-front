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

function updateCartNavbar() {

    const cartInfo = document.getElementById('cart-info');

    //calcula o total de itens do cart
    let totalItems = 0;
    let totalPrice = 0;
    
for (let i = 0; i < cart.length; i++) {
 
  totalPrice += cart[i].price * cart[i].quantity;
  totalItems += cart[i].quantity;
}
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
        
        cartModal();
        
      });
}

function cartModal() {

  // Criação do overlay
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  // Criação do modal
  const cartModal = document.createElement("div");
  cartModal.id = "cart-modal";

  // Mensagem no modal
  const cartTitle = document.createElement("p");
  cartTitle.id = "cart-title";
  cartTitle.innerText = "Seu carrinho de compras";


  // Botão de Sair
  const exitButton = document.createElement("i");
  exitButton.id = "exit-button";
  exitButton.className = "fa fa-times fa-2x";

  const divItemList = document.createElement("div");
  divItemList.id = "div-item-list";



  cart.map((item) => {

    const cartItemCard = document.createElement('div');
    cartItemCard.className = 'cart-item-card';

    const cardDetails = document.createElement('div');
    cardDetails.className = 'card-details';


    const image = document.createElement('img');
    image.className = 'product-image';


    const divProductDetails = document.createElement('div');
    divProductDetails.className = 'product-details';

    const productName = document.createElement('h2');
    productName.className = 'product-name';

    const productDescription = document.createElement('p');
    productDescription.className = 'product-description';

    const productPrice = document.createElement('p');
    productPrice.className = 'product-price';


    const divQuantity = document.createElement('div');
    divQuantity.className = 'div-quantity';

    const plusButton = document.createElement('button');
    plusButton.className = 'quantity-button';

    const quantityField = document.createElement('input');
    quantityField.type = 'text';
    quantityField.className = 'quantity-field';

    const minusButton = document.createElement('button');
    minusButton.className = 'quantity-button';


    const removeItemButton = document.createElement('button');
    removeItemButton.className = 'remove-to-cart-button';

    const removeToCartButtonIcon = document.createElement('i');
    removeToCartButtonIcon.className = 'fa fa-trash fa-3x remove-to-cart-button-icon';


    
    cartItemCard.dataset.partnerId = item.id;

    image.src = `${root}${routes.assets}foods.png`;
    productName.innerText = item.name;
    productDescription.innerText = item.description;
    productPrice.innerText = `R$ ${formatPrice(item.price)}`;


    minusButton.innerText = '-';
    quantityField.value = 0;
    plusButton.innerText = '+';

                
removeItemButton.appendChild(removeToCartButtonIcon);

divQuantity.append(minusButton, quantityField, plusButton);

divProductDetails.append(productName, productDescription, productPrice);

removeItemButton.appendChild(removeToCartButtonIcon);

cardDetails.append(image, divProductDetails, divQuantity);

cartItemCard.append(cardDetails, removeItemButton);

divItemList.appendChild(cartItemCard);


//Eventos

plusButton.addEventListener('click', () => {
    quantityField.value = parseInt(quantityField.value) + 1;
});

        
minusButton.addEventListener('click', () => {
    quantityField.value = Math.max(0, parseInt(quantityField.value) - 1);
});

removeItemButton.addEventListener('click', () => {

   // Remove o 'R$ ' do início do texto do preço e converte para número
const priceText = productPrice.textContent.replace('R$ ', '').replace(',', '.');
const price = parseFloat(priceText); // Converte para número decimal

addCartItem(productName.textContent, price, parseInt(quantityField.value));
    
});


  });



  // Fechar o modal ao clicar em "Sair"
  exitButton.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  // Adiciona elementos ao modal
  cartModal.append(exitButton, cartTitle, divItemList);
  

  // Adiciona modal ao overlay
  overlay.appendChild(cartModal);

  // Adiciona o overlay ao body
  document.body.appendChild(overlay);


}
