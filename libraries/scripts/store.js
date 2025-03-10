

window.onload = function () {
    const partnerId = getPartnerId();

    loadPartnerData(partnerId);

    listPartnerProducts(partnerId);
    
}


function getPartnerId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('partnerId');
}


//REQUISIÇÕES PARA API
async function loadPartnerData(partnerId) {

    try {
        const response = await fetch(`${API_BASE_URL}partners/${partnerId}`);
        
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        const partnerName = data.name;

        document.getElementById("partner-name").textContent = partnerName;
        document.title = partnerName;


    } catch (error) {
        console.error('Erro:', error);
    }
}

async function listPartnerProducts(partnerId) {

    const container = document.querySelector('#container-products');

    try {

        const response = await fetch(`${API_BASE_URL}partners/${partnerId}/products`);

        const data = await response.json();

        data.map((post) => {

            const card = document.createElement('div');
            card.className = 'card';

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


            const addToCartButton = document.createElement('button');
            addToCartButton.className = 'add-to-cart-button';

            const addToCartButtonIcon = document.createElement('i');
            addToCartButtonIcon.className = 'fa fa-cart-plus fa-3x add-to-cart-button-icon';


            
            card.dataset.partnerId = post.id;
        
            image.src = `${root}${routes.assets}foods.png`;
            productName.innerText = post.name;
            productDescription.innerText = post.description;
            productPrice.innerText = `R$ ${formatPrice(post.price)}`;


            minusButton.innerText = '-';
            quantityField.value = 0;
            plusButton.innerText = '+';

                        
        addToCartButton.appendChild(addToCartButtonIcon);

        divQuantity.append(minusButton, quantityField, plusButton);

        divProductDetails.append(productName, productDescription, productPrice);

        addToCartButton.appendChild(addToCartButtonIcon);

        cardDetails.append(image, divProductDetails, divQuantity);

        card.append(cardDetails, addToCartButton);

        container.appendChild(card);


        //Eventos

        plusButton.addEventListener('click', () => {
            quantityField.value = parseInt(quantityField.value) + 1;
        });
    
                
        minusButton.addEventListener('click', () => {
            quantityField.value = Math.max(0, parseInt(quantityField.value) - 1);
        });

        addToCartButton.addEventListener('click', () => {

           // Remove o 'R$ ' do início do texto do preço e converte para número
    const priceText = productPrice.textContent.replace('R$ ', '').replace(',', '.');
    const price = parseFloat(priceText); // Converte para número decimal

    addCartItem(productName.textContent, price, parseInt(quantityField.value));
            
        });
    });

    } catch {
        container.innerHTML = '<p class="error-message">Erro ao carregar produtos. Tente novamente mais tarde.</p>';
    }

}

