const root = window.location.origin;

routes = {

    main: 'index.html',

    //PAGES
    store : '/pages/client/store/index.html',

    //ASSETS
    assets : '/libraries/assets/',
    
}

const API_BASE_URL = 'https://goeat-api.ederoliv.com.br/api/v1/';

function router(routes) {
return root+routes;
}

function apiRoute(){
    return routes.api;
}