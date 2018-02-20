/*
 * Handles post & get Routes
 */
var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/ctrl');

/*
 * Router for Home page
 */
router.get('/',ctrl.home);

/*
 * Router for get login page
 */
router.get('/login',ctrl.get_login);


/*
 * Router for post login page
 */
router.post('/login',ctrl.post_login);


/*
 * Router for get registration page
 */
router.get('/registration',ctrl.get_registration);


/*
 * Router for post registration page
*/
router.get('/registration',ctrl.post_registration);


/*
 * Router for post contact page
*/
router.post('/contactProcess',ctrl.post_contact);


module.exports = router;