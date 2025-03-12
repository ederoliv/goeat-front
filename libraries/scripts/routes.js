const root = window.location.origin;

let API_BASE_URL;

alert("OLA" + window.location.hostname);
if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
    API_BASE_URL = 'http://localhost:8080/api/v1'; // Local
} else {
    API_BASE_URL = process.env.API_PROD_URL || 'https://goeat-api.ederoliv.com.br/api/v1'; // Vercel
}

alert('API Base URL:', API_BASE_URL);


//rotas (Ah VÁ?)
routes = {

    main: 'index.html',

    //PAGES
    store : '/pages/client/store/index.html',

    //ASSETS
    assets : '/libraries/assets/',
    
}

//const API_BASE_URL = process.env.API_PROD_URL || 'http://localhost:8080/api/v1';


function router(routes) {
return root+routes;
}

function apiRoute(){
    return routes.api;
}