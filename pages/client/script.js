// Função para criar um card de parceiro
function criarCardParceiro(parceiro) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const imagem = document.createElement('img');
    imagem.id = 'partner-logo';
    imagem.src = 'https://img.freepik.com/vetores-gratis/restaurante-plano-com-postes-de-iluminacao_23-2147539585.jpg';
  
    const container = document.createElement('div');
    container.classList.add('container');
  
    const nome = document.createElement('h4');
    nome.innerHTML = `<b>${parceiro.name}</b>`;
  
    container.appendChild(nome);
    card.appendChild(imagem);
    card.appendChild(container);
  
    return card;
  }
  
  // Função para buscar os parceiros e criar os cards
  async function listPartners() {

    const container = document.querySelector('#container');

    const response = await fetch('http://localhost:8080/api/v1/partners');

    const data = await response.json();

    data.map((post) => {

        const card = document.createElement('div');
        card.className = 'card';
        const image = document.createElement('img');
        image.className = 'partner-logo';
        const name = document.createElement('h4');
        name.className = 'partner-name';


        card.dataset.partnerId = post.id;

        card.addEventListener('click', () => {
          const partnerId = card.dataset.partnerId;
          window.location.href = `partner/index.html?partnerId=${partnerId}`;
        });

        name.innerText = post.name;
        image.src = '../../assets/partner.png';

        card.appendChild(image);
        card.appendChild(name);

        container.appendChild(card);

    });
  }
    

  
  // Chamar a função ao carregar a página
  window.onload = function() {

    listPartners();
    
  }

  function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
   
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }