/*
 * Handles post & get Routes
 */
var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/ctrl');
var path = require('path');

/*
 * Router for Home page
 */
router.get('/',ctrl.home);

//routing for ajax call for drag and drop
router.get('/text', (req,res)=>{
	res.sendFile(path.join(__dirname,"../views/text.html"));
})


/*
 * Router for get login pageF
 */
router.get('/login',ctrl.get_login);


/*
 * Router for post login page
 */
router.post('/',ctrl.post_login);


/*
 * Router for get registration page
 */
router.get('/registration',ctrl.get_registration);


/*
 * Router for post registration page
*/
router.post('/registration',ctrl.post_registration);


/*
 * Router for post contact page
*/
router.post('/contactProcess',ctrl.post_contact);


/*
 * Router for get profile/update form
*/
router.get('/update',ctrl.loggedIn,ctrl.get_update);


/*
 * Router for update profile
*/
router.post('/update',ctrl.loggedIn,ctrl.post_update);


/*
 * Router for delete profile
*/
router.get('/delete',ctrl.delete);


/*
 * Router for logout button
*/
router.get('/logout',ctrl.logout);


/*
 * Router for admin manage page
*/
router.get('/manage',ctrl.adminLoggedIn,ctrl.get_manage);


/*
 * Router for POST delete feature
 */
router.post('/deleteuser',ctrl.delete_user);


/*
 * Router for get search page
 */
router.get('/search',ctrl.loggedIn,ctrl.getsearch);

/*
 * Router for POST search page
 */
router.post('/search',ctrl.postsearch);


module.exports = router;