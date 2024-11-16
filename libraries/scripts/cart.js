var cart = [];

// FUNÇÕES DO CARRINHO
function addCartItem(productName, productPrice, productQuantity) {

    if(cart.length === 0) createCartNavbar();

    cart.push({ name: productName, price: productPrice, quantity: productQuantity});

    updateCartNavbar();

    //alert(`${cart[cart.length-1].quantity} Unidades de ${cart[cart.length-1].name}`);
}

function removeCartItem(){
    //remove
}

function updateCart(){
    //update
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
    cartInfo.textContent = `Carrinho: ${cart.length} itens | Total: R$ ${totalCartValue()}`;
    
    cartNavbar.appendChild(cartInfo);
    document.body.appendChild(cartNavbar);

    cartNavbar.addEventListener('click', () => {
        
        cartModal();
        
      });

}

function totalCartValue() {

    return 1;

}

function cartModal() {

  // Criação do overlay
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  // Criação do modal
  const cartModal = document.createElement("div");
  cartModal.id = "cart-modal";

  cartModal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  cartModal.style.display = "flex";
  cartModal.style.flexDirection = "column";
  cartModal.style.justifyContent = "center";
  cartModal.style.alignItems = "center";

  // Mensagem no modal
  const message = document.createElement("p");
  message.innerText = "Olá!";
  message.style.fontSize = "18px";
  message.style.marginBottom = "20px";

  // Botão de Sair
  const exitButton = document.createElement("button");
  exitButton.innerText = "Sair";
  exitButton.style.padding = "10px 20px";
  exitButton.style.border = "none";
  exitButton.style.borderRadius = "5px";
  exitButton.style.backgroundColor = "#dc3545";
  exitButton.style.color = "#fff";
  exitButton.style.fontSize = "16px";
  exitButton.style.cursor = "pointer";

  // Fechar o modal ao clicar em "Sair"
  exitButton.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });

  // Adiciona elementos ao modal
  cartModal.appendChild(message);
  cartModal.appendChild(exitButton);

  // Adiciona modal ao overlay
  overlay.appendChild(cartModal);

  // Adiciona o overlay ao body
  document.body.appendChild(overlay);


}
