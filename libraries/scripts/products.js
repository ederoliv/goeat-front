const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
var defaultProductsUrl = `${routes.api}products/`;
var urlWithUserId = `${defaultProductsUrl}${userData.partnerId}`;


window.onload = function() {
  const userDataString = sessionStorage.getItem('userData');
if (userDataString) {
    const userData = JSON.parse(userDataString);
  
    document.getElementById('userName').textContent = userData.name;
    
    listProducts(urlWithUserId);
}
};


function addProductModal() {
  let modal = document.getElementById('modal');


  // Se o modal já existir, remove o conteúdo antigo
  if (modal) {
    modal.innerHTML = ''; // Limpa o conteúdo do modal
  } else {
    // Cria o elemento div para o modal
    modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

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

  const titleAddProduct = document.createElement('h2');
  titleAddProduct.id = 'title-add-product';
  titleAddProduct.textContent = "Cadastrar produto";


  // Cria o input para o nome do produto
  const nameInput = document.createElement('input');
  nameInput.className = 'input-modal';
  nameInput.id = 'nameInput';
  nameInput.type = 'text';
  nameInput.placeholder = 'Nome do produto...';

  // Cria o input para a descrição do produto
  const descriptionInput = document.createElement('input');
  descriptionInput.className = 'input-modal';
  descriptionInput.id = 'descriptionInput';
  descriptionInput.type = 'text';
  descriptionInput.placeholder = 'Descrição do produto...';

  // Cria o input para a URL da imagem do produto
  const imageUrlInput = document.createElement('input');
  imageUrlInput.className = 'input-modal';
  imageUrlInput.id = 'imageUrlInput';
  imageUrlInput.type = 'text';
  imageUrlInput.placeholder = 'URL da imagem do produto...';

  // Cria o input para o preço do produto
  const priceInput = document.createElement('input');
  priceInput.className = 'input-modal';
  priceInput.id = 'priceInput';
  priceInput.type = 'number';
  priceInput.placeholder = 'Preço do produto...';

  // Cria o input para a categoria do produto
  const categoryInput = document.createElement('input');
  categoryInput.className = 'input-modal';
  categoryInput.id = 'categoryInput';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Categoria do produto...';

  // Cria o botão de adicionar
  const addButton = document.createElement('input');
  addButton.id = 'addButton';
  addButton.className = 'input-modal';
  addButton.type = 'button';
  addButton.value = 'Adicionar';
  addButton.onclick = addProduct; // Função para adicionar o produto

  // Adiciona os inputs ao div de inputs
  modalInputs.appendChild(titleAddProduct);
  modalInputs.appendChild(nameInput);
  modalInputs.appendChild(descriptionInput);
  modalInputs.appendChild(imageUrlInput);
  modalInputs.appendChild(priceInput);
  modalInputs.appendChild(categoryInput);
  modalInputs.appendChild(addButton);

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

// Função para fechar o modal
function fechar() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Função para adicionar o produto (a ser implementada)
function addProduct() {
  const name = document.getElementById('nameInput').value;
  const description = document.getElementById('descriptionInput').value;
  const imageUrl = document.getElementById('imageUrlInput').value;
  const price = document.getElementById('priceInput').value;
  const category = document.getElementById('categoryInput').value;

  // Aqui você pode adicionar a lógica para salvar o produto
  console.log('Produto adicionado:', { name, description, imageUrl, price, category });

  // Fecha o modal após adicionar o produto
  fechar();
}

function editarProdutoModal(){
  alert("editarProdutoModal");
}


function deleteProductModal() {
  let modal = document.getElementById('modal');


  // Se o modal já existir, remove o conteúdo antigo
  if (modal) {
    modal.innerHTML = ''; // Limpa o conteúdo do modal
  } else {
    // Cria o elemento div para o modal
    modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

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

    const table = document.querySelector('table');

    const thead = document.createElement('thead');

    const tr = document.createElement('tr');

    const thId = document.createElement('th');
    const thName = document.createElement('th');
    const thDescription = document.createElement('th');
    const thPrice = document.createElement('th');
    const thImage = document.createElement('th');
    const thEdit = document.createElement('th');
    const thDelete = document.createElement('th');

    thId.textContent = "ID";
    thName.textContent = "Nome";
    thDescription.textContent = "Descrição";
    thPrice.textContent = "Preço"
    thImage.textContent = "Imagem";
    thEdit.textContent = "Editar";
    thDelete.textContent = "Excluir";


    thead.append(thId, thName, thDescription, thPrice, thImage, thEdit, thDelete);

    table.appendChild(thead);

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
        const editButton = document.createElement('th');
        const deleteButton = document.createElement('th');

        id.innerText = post.id.slice(0,3);
        name.innerText = post.name;
        description.innerText = post.description;
        price.innerText = post.price;
        imageUrl.innerText = post.imageUrl;
        editButton.className = "list-product-edit-button fa fa-pencil-square-o";
        deleteButton.className = "list-product-delete-button fa fa-trash";
      


        tr.appendChild(id);
        tr.appendChild(name);
        tr.appendChild(description);
        tr.appendChild(price)
        tr.appendChild(imageUrl);
        tr.appendChild(editButton);
        tr.appendChild(deleteButton);

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

