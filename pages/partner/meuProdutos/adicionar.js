const userDataString = sessionStorage.getItem('userData');
const userData = JSON.parse(userDataString);
var defaultProductsUrl = 'http://localhost:8080/api/v1/products';


function toggleSidebar() {
    if (!sidebarOpen) {
      sidebar.classList.add("sidebar_responsive");
      sidebarOpen = true;
    }
  }
  
  function closeSidebar() {
    if (sidebarOpen) {
      sidebar.classList.remove("sidebar_responsive");
      sidebarOpen = false;
    }
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

var span = document.getElementsByClassName("close")[0];
span.onclick = fechar();

function fechar() {

  document.getElementById("modal").style.display = "none";
}