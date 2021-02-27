// Initialize express router
import express from 'express';
const router = express.Router();

// Import the controller
import * as AuthenticationController from '../controllers/authenticationController.js';

// Declare the routes
router.post('/', AuthenticationController.userLogin);  

// Export
export default router;