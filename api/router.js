const authController = require('./controladores/auth');
const usarioController = require('./controladores/usuario');
const Usuario = require('./modelos').Usuario;
const authMiddleware = require('./middlewares/auth');
var users = require('./controladores/users.js');

module.exports.set = (app) => {


    app.set('views', './view');
    app.set('view engine', 'pug');

    //app.options('', cors())

    app.post('/login', authController.login);
    app.post('/register', authController.register);

    //next endpoints require auth
    app.get('/', authMiddleware.checkAuth, function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({1:"Hola"}));
    });

	app.get('/usuarios', authMiddleware.checkAuth, usarioController.getUsuarios);
	app.get('/usuarios/:id', authMiddleware.checkAuth, usarioController.getUsuario);
	app.put('/usuarios', authMiddleware.checkAuth, usarioController.updateUsuario);
	app.delete('/usuarios/:id', authMiddleware.checkAuth, usarioController.deleteUsuario);
    app.post('/usuarios', authMiddleware.checkAuth, usarioController.addUsuario);
    
    app.get('/verify_email', function(req,res) {
        console.log('verify_email token: ',req.query.token);

        Usuario.update(
            { autenticado: true },
            { where: { token: req.query.token } }
          ).then(result => handleResult(result)).catch(err => handleError(err))

        res.render('verify', {title: 'Authentication Completed'});
    });

    app.post('/verification/start', authMiddleware.checkAuth, users.requestPhoneVerification);
    app.post('/verification/verify', authMiddleware.checkAuth, users.verifyPhoneToken);

}