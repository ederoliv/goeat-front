
document.getElementById('partner-login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que o formulário seja submetido normalmente

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const url = `http://localhost:8080/partners/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    // Fazendo a requisição GET
    fetch(url, {
        method: 'GET',
    })
    .then(response => response.json()) // Assumindo que a resposta da API seja em JSON
    .then(data => {
        console.log(data); // Aqui você pode manipular a resposta da API
        // Por exemplo, redirecionar o usuário para outra página ou mostrar uma mensagem
    })
    .catch(error => {
        console.error('Erro:', error);
        // Aqui você pode tratar erros, como mostrar uma mensagem de erro ao usuário
    });
});