// Initialize express router
import express from 'express';
const router = express.Router();

// Import the controller
import * as AuthenticationController from '../controllers/authenticationController.js';

// Declare the routes
router.post('/signup', AuthenticationController.userLoginCreate);  
router.post('/signin', AuthenticationController.userLogin);  
router.post('/signout', AuthenticationController.userLogOut);  

// Export
export default router;