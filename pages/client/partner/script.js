window.onload = function () {
    const partnerId = getPartnerId();


    
});


// pega o ID da URL
function getPartnerId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('partnerId');
}

function loadpartnerData() {
        // request pra pegar os dados do restaurante
    fetch(`https://localhost:8080/api/v1/partners/${partnerId}`)
        .then(response => response.json())
        .then(data => {
    })
}

function listPartnerProducts() {

    // request pra pegar a lista de produtos do restaurante
    fetch(`https://localhost:8080/api/v1/partners/${partnerId}/products`)
        .then(response => response.json())
        .then(data => {

});


}
