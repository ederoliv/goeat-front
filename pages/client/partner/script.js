window.onload = function () {
    const partnerId = getPartnerId();

    loadPartnerData(partnerId);

    
}


function getPartnerId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('partnerId');
}

async function loadPartnerData(partnerId) {

    try {
        const response = await fetch(`http://localhost:8080/api/v1/partners/${partnerId}`);
        
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

    const response = await fetch(`http://localhost:8080/api/v1/partners/${partnerId}/products`);

    const data = await response.json();

    data.map((post) => {

        const card = document.createElement('div');
        card.className = 'card';


        const image = document.createElement('img');
        image.className = 'product-image';


        const divProductDetails = document.createElement('div');
        divProductDetails.className = 'product-details';

        const productName = document.createElement('h2');
        productName.className = 'product-name';

        const productDescription = document.createElement('p');
        productDescription.className = 'product-description';


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
        addToCartButtonIcon.className = 'fa fa-cart-plus';

        
        /*
        card.dataset.partnerId = post.id;

        
        card.addEventListener('click', () => {
          const partnerId = card.dataset.partnerId;
          window.location.href = `partner/index.html?partnerId=${partnerId}`;
        });
        */

        addToCartButton.appendChild(addToCartButtonIcon);

        divQuantity.append(plusButton, quantityField, minusButton);

        divProductDetails.append(productName, productDescription);
        
        card.append(image, divProductDetails, divQuantity, addToCartButton);

        container.appendChild(card);

        
        name.innerText = post.name;
        image.src = '../../assets/partner.png';

    });

}
