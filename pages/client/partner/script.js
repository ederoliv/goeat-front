// pega o ID da URL
function obterIdRestaurante() {
    const params = new URLSearchParams(window.location.search);
    return params.get('restauranteId');
}

const restauranteId = obterIdRestaurante();

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
