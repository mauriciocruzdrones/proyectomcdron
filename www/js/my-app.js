  
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
        path: '/inicio/',
        url: 'inicio.html',
      },
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

var db = firebase.firestore();
var colUsuarios = db.collection("USUARIOS");

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    //inicializarTablas();
});




$$(document).on('page:init', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized

    

    $$(".irPerfil").on("click",function(){
      mainView.router.navigate('/perfil/');
    });

    $$(".irIndex").on("click",function(){
      mainView.router.navigate('/index/');
    });

    $$(".irInicio").on("click",function(){
      mainView.router.navigate('/inicio/');
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

    $$(".irRecuperar").on("click",function(){
      console.log("click recuperar");
      recuperaContra();
    });
});




// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log(e);
});

function registro(){
  var email = $$("#regEmail").val();
  var password = $$("#regContra").val();
  var password2 = $$("#regContra2").val();
  var nick = $$('#regNick').val();

  if(email!="" && password!=""){
    if(password==password2){
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(function(){
          //todo lo que tiene que hacer si se registró
          console.log("Se registró");

          //POR QUE ESTO NO FUNCIONA????
          /*
          firebase.auth().onAuthStateChanged(function(user) {
            console.log("user.displayName: " + user.displayName);
            user.displayName = nick;
            console.log("user.displayName: " + user.displayName);
            user.sendEmailVerification();
          });
          */

          firebase.auth().onAuthStateChanged(function(user) {
            console.log("user.displayName: " + user.displayName);
            user
            .updateProfile({ 
              displayName: nick,
              app_name: "App MC Dron"
            })
            .then(function(){
              console.log("user.displayName: " + user.displayName);
              user.sendEmailVerification();
            });
          });

          app.dialog.alert("Verifique su email. Compruebe su casilla de correos","Atención");

          datos = {Nick: nick};
          colUsuarios.doc(email).set(datos);
          mainView.router.navigate('/login/');
        })
        .catch(function(error){
          //Handle Errors here
          console.log("Entró al catch");
          var errorCode = error.code;
          var errorMessage = error.messge;
          if(errorCode == 'auth/weak-password'){
              console.log('Clave muy débil');
          }else{
              console.log(errorCode + "   "  + errorMessage);
          };
        });
    }else{
      app.dialog.alert("Las contraseñas no son iguales","Atención");
    };
  }else{
    app.dialog.alert("Completa todos los campos","Atención");
  }
}

function login(){
  var email = $$("#logEmail").val();
  var password = $$("#logContra").val();

  if(email!="" && password!=""){

      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(function(){
        //todo lo que tiene que hacer si se registró
        console.log("Se logueó");

        firebase.auth().onAuthStateChanged(function(user) { 
          if (user.emailVerified) {
            console.log('Email is verified');
            mainView.router.navigate('/inicio/');
          }
          else {
            console.log('Email is not verified');
            app.dialog.alert("Falta verificar el email. Compruebe su casilla de correos","Atención");
            firebase.auth().currentUser.sendEmailVerification();
          }
        });        
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


function recuperaContra(){
  var email = $$("#logEmail").val();

  console.log("Entra a recuperaContra")

  if(email!=""){
    firebase.auth().sendPasswordResetEmail(email)
      .then(function() {
        // Password reset email sent.
        app.dialog.alert("Te enviamos un email para cambiar la contraseña","Atención");
      })
      .catch(function(error) {
        // Error occurred. Inspect error.code.
      });
  }else{
    app.dialog.alert("Completa el email","Atención");
  };
}

/*inicializarTablas(){

  var email = "a@a.com";
  var datos = { Ciudad: "Rosario", Provincia: "Santa Fe", Habitantes: 1400000 };
  colCiudades.doc(cp).set(datos);

}*/

