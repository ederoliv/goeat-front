// pega o ID da URL
function getPartnerId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('partnerId');
}

const partnerId = getPartnerId();

// request pra pegar os dados do restaurante
fetch(`/api/restaurantes/${partnerId}`)
    .then(response => response.json())
    .then(data => {
        
    });

// request pra pegar a lista de produtos do restaurante
fetch(`/api/restaurantes/${partnerId}/produtos`)
    .then(response => response.json())
    .then(data => {
    
    });
