// Chamar a função ao carregar a página
window.onload = function () {
  alert(API_BASE_URL);
  listPartners();
};

// Função para buscar os parceiros e criar os cards
async function listPartners() {
  const partnersGrid = document.querySelector('#partners-grid'); // Seleciona o contêiner da grade

  const response = await fetch('https://goeat-api.ederoliv.com.br/api/v1/partners');
  const data = await response.json();

  data.forEach((partner) => {
    const card = document.createElement('div');
    card.className = 'card animate__animated animate__bounceInLeft';
    const image = document.createElement('img');
    image.className = 'partner-logo';
    const name = document.createElement('h4');
    name.className = 'partner-name';

    card.dataset.partnerId = partner.id;

    card.addEventListener('click', () => {
      const partnerId = card.dataset.partnerId;
      window.location.href = `${router(routes.store)}?partnerId=${partnerId}`;
    });

    name.innerText = partner.name;
    image.src = `${router(routes.assets)}partner.png`;

    card.appendChild(image);
    card.appendChild(name);

    partnersGrid.appendChild(card); // Adiciona o card ao contêiner da grade
  });
}

function w3_open() {
  document.getElementById('mySidebar').style.display = 'block';
}

function w3_close() {
  document.getElementById('mySidebar').style.display = 'none';
}