const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
var defaultProductsUrl = 'http://localhost:8080/api/v1/products/';
var urlWithUserId = `http://localhost:8080/api/v1/products/${userData.partnerId}`;


window.onload = function() {
  const userDataString = sessionStorage.getItem('userData');
if (userDataString) {
    const userData = JSON.parse(userDataString);
  
    document.getElementById('userName').textContent = userData.name;

    var urlWithUserId = `http://localhost:8080/api/v1/products/${userData.partnerId}`;
    
    listProducts(urlWithUserId);
}
};


function adicionarProdutoModal() {
  
}

function editarProdutoModal(){
  alert("editarProdutoModal");
}


function deleteProductModal() {
  let modal = document.getElementById('modal');

  // Se o modal já existir, apenas o exibe
  if (modal) {
    modal.style.display = 'block';
    return;
  }

  // Cria o elemento div para o modal
  modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';

  // Cria o elemento div para o conteúdo do modal
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Cria o elemento span para o botão de fechar
  const closeSpan = document.createElement('span');
  closeSpan.id = 'close';
  closeSpan.className = 'close';
  closeSpan.innerHTML = '&times;';
  closeSpan.onclick = fechar; // Atribui o evento onclick

  // Cria o elemento div para os inputs do modal
  const modalInputs = document.createElement('div');
  modalInputs.className = 'modal-inputs';

  // Cria o input para o código do produto
  const codeInput = document.createElement('input');
  codeInput.className = 'input-modal';
  codeInput.id = 'codeInput';
  codeInput.type = 'text';
  codeInput.placeholder = 'Digite o código do produto...';

  // Cria o botão de excluir
  const deleteButton = document.createElement('input');
  deleteButton.id = 'deleteButton';
  deleteButton.className = 'input-modal';
  deleteButton.type = 'button';
  deleteButton.value = 'Excluir';
  deleteButton.onclick = deleteProducts;

  // Adiciona os inputs ao div de inputs
  modalInputs.appendChild(codeInput);
  modalInputs.appendChild(deleteButton);

  // Adiciona o botão de fechar e os inputs ao conteúdo do modal
  modalContent.appendChild(closeSpan);
  modalContent.appendChild(modalInputs);

  // Adiciona o conteúdo ao modal
  modal.appendChild(modalContent);

  // Adiciona o modal ao corpo do documento
  document.body.appendChild(modal);

  // Exibe o modal
  modal.style.display = 'block';
}


// busca produtos

async function listProducts(url) { 

    const tbody = document.querySelector('#tbody');

    const response = await fetch(url);

    const data = await response.json();

    data.map((post) => {


        const tr =  document.createElement('tr');

        const id = document.createElement('th');
        const name = document.createElement('th');
        const description = document.createElement('th');
        const price = document.createElement('th');
        const imageUrl = document.createElement('th');


        id.innerText = post.id;
        name.innerText = post.name;
        description.innerText = post.description;
        price.innerText = post.price;
        imageUrl.innerText = post.imageUrl;


        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(description);
        tr.appendChild(price)
        tr.appendChild(imageUrl);

        tbody.appendChild(tr);
        
    });
}

async function deleteProducts(){

  const codeInput = document.getElementById("codeInput");

  const url = `http://localhost:8080/api/v1/products/${codeInput.value}`;

  console.log(url);

  const response = await fetch(url , { 
    method: 'DELETE'})
    .then(response => {

      listProducts(`${urlWithUserId}${userData.partnerId}`);
      console.log(response.status);
    });
  }

  
async function registerProduct(){

  const name = document.getElementById('nome');
  const description = document.getElementById('descricao');
  const price = document.getElementById('preco');
  const menuId = userData.partnerId;

  const data = {
    name: name.value,
    description: description.value,
    price: price.value,
    imageUrl: 'link ds imagem',
    menuId: userData.partnerId
  }

  const response = await fetch(defaultProductsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Indicando que o corpo da requisição é JSON
  },
  body: JSON.stringify(data)
})
    .then(response => {

      if (response.ok) {
        alertaSucesso();
      }
    });
}

//modal
function alertaSucesso() {
document.getElementById("modal").style.display = "block";
}

// Função para fechar o modal
function fechar() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

