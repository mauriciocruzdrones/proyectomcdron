  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
      
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/login/',
        url: 'login.html',
      },
      {
        path: '/registro/',
        url: 'registro.html',
      },
      {
        path: '/listarep/',
        url: 'listarep.html',
      },
      {
        path: '/reparacion/',
        url: 'reparacion.html',
      },
      {
        path: '/presupuesto/',
        url: 'presupuesto.html',
      },
      {
        path: '/perfil/',
        url: 'perfil.html',
      },

      
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});




$$(document).on('page:init', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized

    function registro(){
      var email = $$("#regEmail").val();
      var password = $$("#regContra").val();

      if(email!="" && password!=""){

          firebase.auth().createUserWithEmailAndPassword(email,password)

          .then(function(){
            //todo lo que tiene que hacer si se registró

            console.log("Se registró");

          })
          .catch(function(error){
            //Handle Errors here
            var errorCode = error.code;
            var errorMessage = error.messge;
            if(errorCode == 'auth/weak-password'){
                console.log('Clave muy débil');
            }else{
                console.log(errorMessage);
            };
          });
      }else{
        app.dialog.alert("Completa todo los campos","Atención");
      };
    }

    function login(){
      var email = $$("#logEmail").val();
      var password = $$("#logContra").val();

      if(email!="" && password!=""){

          firebase.auth().signInWithEmailAndPassword(email,password)

          .then(function(){
            //todo lo que tiene que hacer si se registró

            console.log("Se logueó");

          })
          .catch(function(error){
            //Handle Errors here
            var errorCode = error.code;
            var errorMessage = error.messge;
            if(errorCode == 'auth/weak-password'){
                console.log('Clave muy débil');
            }else{
                console.log(errorMessage);
            };
          });
      }else{
        app.dialog.alert("Completa todo los campos","Atención");
      };
    }

    $$(".irPerfil").on("click",function(){
      mainView.router.navigate('/perfil/');
    });

    $$(".irRegistro").on("click",function(){
      console.log("click registro");
      mainView.router.navigate('/registro/');
    });

    $$(".irLogin").on("click",function(){
      console.log("click login");
      mainView.router.navigate('/login/');
    });

    $$(".irRegistrarse").on("click",function(){
      console.log("click registrarse");
      registro();
    });

    $$(".irLoguearse").on("click",function(){
      console.log("click loguearse");
      login();
    });
});




// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
})