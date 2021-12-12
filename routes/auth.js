const router = require('express').Router();

const AuthControler = require('../controllers/AuthController');

router.get('/login');
router.get('/register');
router.get('/logout');

module.exports = router;
