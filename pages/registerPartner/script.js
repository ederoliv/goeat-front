
function register() {


    const name = document.getElementById('name');
    const cnpj = document.getElementById('cnpj');
    const number = document.getElementById('number');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
  
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/partners/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    const registry = {

      email: email,
      password: password
    };
  
    xhr.send(JSON.stringify(registry));
  
    xhr.onload = function() {//em caso de sucesso
      if (xhr.status === 200) {
  
      const partnerData = JSON.parse(xhr.responseText);
      sessionStorage.setItem('userData', JSON.stringify(partnerData));
  
      window.location.replace('../loginPartner/index.html');
      
      } else {
        alert('Login failed!');
        // Handle error scenario
      }
    };
  }