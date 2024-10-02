function login() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/clients/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    const credentials = {
      email: email,
      password: password
    };
  
    xhr.send(JSON.stringify(credentials));
  
    xhr.onload = function() {//em caso de sucesso
      if (xhr.status === 200) {
  
      const clientData = JSON.parse(xhr.responseText);
      sessionStorage.setItem('userData', JSON.stringify(clientData));
  
      window.location.replace('../client/index.html');
      
      } else {
        alert('Login failed!');
        // Handle error scenario
      }
    };
  }