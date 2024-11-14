const root = window.location.origin;

routes = {

    main: 'index.html',

    //PAGES
    store : '/pages/client/store/index.html',

    //ASSETS
    assets : '/libraries/assets/'
    
}

function router(routes) {
return root+routes;
}