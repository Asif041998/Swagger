const router = require('express').Router();
const express = require('express');
const app = express();
const { verify } = require('jsonwebtoken');
const controller = require('../controllers/controller');
const Authenticate = require('../middlewares/authenticate');
const passportMiddleware = require('../middlewares/passportAuthenticate');
const Verify = require('../middlewares/verify');
const passport = require('passport');
const session = require('express-session');
 app.use(passport.session());



/**
 * @swagger
 * tags:
 *   name: RBAC
 *   description: Role Based Access Control System 
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: List all users
 *     tags: [RBAC]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All Users....
 *       401:
 *         description: Unauthorized....
 */
router.get('/user',Verify, controller.getRegisteredDetails);

/**
 * @swagger
 * /api/user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Register the users.
 *     tags: [RBAC]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *               password: 
 *                 type: string  
 *               status:
 *                 type: string           
 *     responses:
 *       200:
 *         description: Created Successfully...
 *       400:
 *         description: Bad Request         
*/

router.post('/user', controller.Registration);

/**
 * @swagger
 * /api/login:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Login details.
 *     tags: [RBAC]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password: 
 *                 type: string           
 *     responses:
 *       200:
 *         description:  Successfully Logged-In...
 *       400:
 *         description: Bad Request         
*/
router.post('/login',controller.logIn);
router.get('/protected',Verify, controller.accessRBAC);
// router.put('/user/:id/status', controller.checkStatus);
router.get('/google', passportMiddleware,passport.authenticate('google',
{
    scope: ['profile','email']
}
), controller.passportAuth);


router.get('/google/redirect',
passport.authenticate('google', {
  scope: ['profile','email'],
  successRedirect:'/login'
}));

router.post('/paginate', controller.Paginate);
router.get('/', controller.registerPassport);
router.get('/log', controller.logPassport);
router.get('/google',controller.googleSignin)

module.exports = router;

