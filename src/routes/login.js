const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.index);
router.get('/register', LoginController.register);
router.post('/login', LoginController.auth);
router.post('/register', LoginController.storeUser);
router.get('/logout', LoginController.logout);
router.post('/tasks/delete', LoginController.destroy);
router.get('/tasks/edit/:id', LoginController.edit);
router.post('/tasks/edit/:id', LoginController.update);



router.get('/tasks', LoginController.indextask);
router.get('/indextask', LoginController.indextask);
router.get('/indexuser', LoginController.indexuser);
router.get('/indextaskuser', LoginController.indextaskuser);
//// create2
router.get('/create2', LoginController.create2);
router.post('/create2', LoginController.store2);
////

router.get('/create', LoginController.create);
router.post('/create', LoginController.store);

//// create store 3

router.get('/create3', LoginController.create3);
router.post('/create3', LoginController.store3);

/// super
router.get('/createsuper', LoginController.createsuper);
router.post('/createsuper', LoginController.storesuper);

///
router.get('/createuser', LoginController.createuser);
router.post('/createuser', LoginController.storeuser);












module.exports = router;
