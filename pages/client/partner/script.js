window.onload = function () {
    const partnerId = getPartnerId();

    loadPartnerData(partnerId);

    
}


// pega o ID da URL
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

        // Atualiza o conteúdo do elemento <h1> com o nome do parceiro
        document.getElementById("partner-name").textContent = partnerName;

    } catch (error) {
        console.error('Erro:', error);
    }
}

function listPartnerProducts() {

    // request pra pegar a lista de produtos do restaurante
    fetch(`http://localhost:8080/api/v1/partners/${partnerId}/products`)
        .then(response => response.json())
        .then(data => {

    });
}
