const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
const defaultProductsUrl = `https://goeat-api.ederoliv.com.br/api/v1/products/`;
const urlWithUserId = `${defaultProductsUrl}${userData.partnerId}`;

window.onload = function () {
  if (userDataString) {
    document.getElementById('userName').textContent = userData.name;
    listProducts(urlWithUserId);
  }
};

function _addProductModal() {
  let modal = document.getElementById("modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal";
    document.body.appendChild(modal);
  } else {
    modal.innerHTML = ""; // Limpa o conteúdo existente
  }

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Cadastrar Produto";

  const closeButton = document.createElement("button");
  closeButton.className = "close-button fa fa-times";
  closeButton.onclick = () => (modal.style.display = "none");

  modalHeader.append(modalTitle, closeButton);

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  // Criação dos inputs diretamente dentro da função
  const inputs = [
    { id: "nameInput", type: "text", placeholder: "Nome do produto...", label: "Nome do Produto" },
    { id: "descriptionInput", type: "text", placeholder: "Descrição do produto...", label: "Descrição" },
    { id: "priceInput", type: "number", placeholder: "Preço do produto...", label: "Preço" },
    { id: "imageUrlInput", type: "text", placeholder: "URL da imagem do produto...", label: "URL da Imagem" },
    { id: "categoryInput", type: "text", placeholder: "Categoria do produto...", label: "Categoria" },
  ];

  inputs.forEach(input => {
    const label = document.createElement("label");
    label.textContent = input.label;
    label.setAttribute("for", input.id);

    const inputElement = document.createElement("input");
    inputElement.id = input.id;
    inputElement.type = input.type;
    inputElement.placeholder = input.placeholder;
    inputElement.className = "input-modal";

    modalBody.append(label, inputElement);
  });

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";

  const cancelButton = document.createElement("button");
  cancelButton.className = "cancel-button";
  cancelButton.textContent = "Cancelar";
  cancelButton.onclick = () => (modal.style.display = "none");

  const saveButton = document.createElement("button");
  saveButton.className = "save-button";
  saveButton.textContent = "Salvar";
  saveButton.onclick = addProduct;

  modalFooter.append(cancelButton, saveButton);
  modalContent.append(modalHeader, modalBody, modalFooter);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  modal.style.display = "flex";
}

function addProduct() {
  const name = document.getElementById("nameInput").value;
  const description = document.getElementById("descriptionInput").value;
  const price = document.getElementById("priceInput").value;
  const imageUrl = document.getElementById("imageUrlInput").value;
  const category = document.getElementById("categoryInput").value;

  console.log("Produto adicionado:", { name, description, price, imageUrl, category });
  alert("Produto adicionado com sucesso!");
  fechar();
}

function fechar() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function deleteProductModal() {
  let modal = document.getElementById('modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  } else {
    modal.innerHTML = '';
  }

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeSpan = document.createElement('span');
  closeSpan.id = 'close';
  closeSpan.className = 'close';
  closeSpan.innerHTML = '&times;';
  closeSpan.onclick = fechar;

  const modalInputs = document.createElement('div');
  modalInputs.className = 'modal-inputs';

  const codeInput = document.createElement('input');
  codeInput.className = 'input-modal';
  codeInput.id = 'codeInput';
  codeInput.type = 'text';
  codeInput.placeholder = 'Digite o código do produto...';

  const deleteButton = document.createElement('input');
  deleteButton.id = 'deleteButton';
  deleteButton.className = 'input-modal';
  deleteButton.type = 'button';
  deleteButton.value = 'Excluir';
  deleteButton.onclick = deleteProducts;

  modalInputs.append(codeInput, deleteButton);
  modalContent.append(closeSpan, modalInputs);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  modal.style.display = 'block';
}

async function listProducts(url) {
  const table = document.querySelector('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  const headers = ["ID", "Nome", "Descrição", "Preço", "Imagem", "Editar", "Excluir"];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  table.appendChild(thead);

  const tbody = document.querySelector('#tbody');
  tbody.innerHTML = ''; // Limpa o conteúdo existente

  const response = await fetch(url);
  const data = await response.json();

  data.forEach(post => {
    const tr = document.createElement('tr');

    const fields = [post.id.slice(0, 3), post.name, post.description, post.price, post.imageUrl];
    fields.forEach(field => {
      const td = document.createElement('td');
      td.innerText = field;
      tr.appendChild(td);
    });

    const editButton = document.createElement('td');
    const editIcon = document.createElement('i');
    editIcon.className = "fa fa-pencil-square-o list-product-edit-button";
    editButton.appendChild(editIcon);

    const deleteButton = document.createElement('td');
    const deleteIcon = document.createElement('i');
    deleteIcon.className = "fa fa-trash list-product-delete-button";
    deleteButton.appendChild(deleteIcon);

    tr.append(editButton, deleteButton);
    tbody.appendChild(tr);
  });
}

async function deleteProducts() {
  const codeInput = document.getElementById("codeInput");
  const url = `${API_BASE_URL}products/${codeInput.value}`;

  const response = await fetch(url, { method: 'DELETE' });
  if (response.ok) {
    listProducts(`${urlWithUserId}${userData.partnerId}`);
  }
}

async function registerProduct() {
  const name = document.getElementById('nome');
  const description = document.getElementById('descricao');
  const price = document.getElementById('preco');

  const data = {
    name: name.value,
    description: description.value,
    price: price.value,
    imageUrl: 'link da imagem',
    menuId: userData.partnerId,
  };

  const response = await fetch(defaultProductsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alertaSucesso();
  }
}

function alertaSucesso() {
  document.getElementById("modal").style.display = "block";
}