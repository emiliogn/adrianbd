const bcrypt = require('bcrypt');

//// despues de iniciar sesion manda al index ya con cuenta
function index(req, res) {
  if (req.session.loggedin) {
		// Output username
    res.redirect('/');
	
  } else {
    res.render('login/index');
  }
}
////////// despues de hace rel registro redirecciona a la ruta raiz
function register(req, res) {
  if(req.session.loggedin != true){

    res.render('login/register');
  }else {
    res.redirect('/');
   
  }

 

}
/////////////login y validaciones
function auth(req, res) {
	const data = req.body;
  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM usuarios WHERE email =?', [data.email],(err, userdata)=> {
        if(userdata.length > 0) {
            userdata.forEach(element => {
              bcrypt.compare(data.password, element.password, (err, isMatch) => {
                if(!isMatch) {
                  
                    res.render('login/index', { error: ' Error> Contra incorrecta'});
                  
                  
              }else{
                if(element.rol ==='superusuario'){
                  req.session.loggedin = true;
                  req.session.name = element.name
                  res.redirect('/');
                  
                }else if(element.rol ==='usuario'){
                  req.session.loggedin = true;
                  req.session.name = element.name
                  res.redirect('/indextaskuser');
                }
                
                
                else {
                  
                  
                  req.session.loggedin = false;
                  res.render('login/index', { error: 'Error al obtener permisos'});
                  
                }
                


              }
              
            });
          });
        } else {
          res.render('login/index', { error: ' Error> El usuario no existe'});
        }

    });
  });



}
////// Registro y validacion de correo existente
function storeUser(req, res) {
    const data = req.body;
    req.getConnection((err, conn) =>{
      conn.query('SELECT * FROM usuarios WHERE email = ?',[data.email],(err, userdata) => {
          if(userdata.length > 0){
            res.render('login/register', { error: 'Error: El correo ya existe'});

          }else{
            bcrypt.hash(data.password, 12).then(hash =>{

              data.password = hash;
              req.getConnection((err, conn) => {
        
                conn.query('INSERT INTO usuarios SET ?',[data],(err, rows) =>{

                   

                  res.redirect('/');
        
                });
              });
            });

          }

      });
    });

}
//////////////////////////////////////////////////store nuevo para crear usuarios con el super admn
function storesuper(req, res) {
  const data = req.body;
  req.getConnection((err, conn) =>{
    conn.query('SELECT * FROM usuarios WHERE email = ?',[data.email],(err, userdata) => {
        if(userdata.length > 0){
          res.render('login/register', { error: 'Error: El correo ya existe'});

        }else{
          bcrypt.hash(data.password, 12).then(hash =>{

            data.password = hash;
            req.getConnection((err, conn) => {
      
              conn.query('INSERT INTO usuarios SET ?',[data],(err, rows) =>{

                 req.session.loggedin = true;
              req.session.name = data.name;

                res.redirect('/');
      
              });
            });
          });

        }

    });
  });

}

////// boton de cerrar sesion

function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}

//// super admin modificaciones no modificar*
function indextask(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM salidas', (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/indextask', { tasks });
    });
  });
}

function indextaskuser(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM salidas', (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/indextaskuser', { tasks });
    });
  });
}



function createuser(req, res) {

  res.render('/storesuper');
}


function create(req, res) {

  res.render('tasks/create');
}
///
function create3(req, res) {

  res.render('tasks/create3');
}


function create2(req, res) {

  res.render('tasks/create2');
}
// para super admin
function store(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO salidas SET ?', [data], (err, rows) => {
      res.redirect('/indextaskuser');
    });
  });
}
//// para reg de super admin
function store2(req, res) {
  const data = req.body;
    req.getConnection((err, conn) =>{
      conn.query('SELECT * FROM usuarios WHERE email = ?',[data.email],(err, userdata) => {
          if(userdata.length > 0){
            res.render('/create2', { error: 'Error: El correo ya existe'});

          }else{
            bcrypt.hash(data.password, 12).then(hash =>{

              data.password = hash;
              req.getConnection((err, conn) => {
        
                conn.query('INSERT INTO usuarios SET ?',[data],(err, rows) =>{

                   

                  res.redirect('/create2');
        
                });
              });
            });

          }

      });
    });

}

/// store 3


function store3(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO salidas SET ?', [data], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}



function storeuser(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO salidas SET ?', [data], (err, rows) => {
      res.redirect('/indextaskuser');
    });
  });
}

function destroy(req, res) {
  const id = req.body.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM salidas WHERE id = ?', [id], (err, rows) => {
      res.redirect('/tasks');
    });
  })
}

function edit(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM salidas WHERE id = ?', [id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
}
function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('UPDATE salidas SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}


function indexuser(req, res) {
  if (req.session.loggedin) {
		// Output username
    res.redirect('/');
	
  } else {
    res.render('/indexuser');
  }
}



function createsuper(req, res) {

  res.render('/indextaskuser');
}

function storesuper(req, res) {

  res.render('/indextaskuser');
}

module.exports = {
  index: index,
  register: register,
  auth: auth,
  logout: logout,
  storeUser,

   indextask,
   create,
   store,
   destroy,
   edit,
   update,
   indextaskuser,
   indexuser,
   
   
   createuser,
   storeuser,
   storesuper,
   createsuper,
   create2,
   store2,
   create3,
   store3,
  }
