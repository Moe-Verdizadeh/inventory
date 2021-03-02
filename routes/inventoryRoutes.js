// Initialize express router
import express from 'express';
const router = express.Router();



// Import the controller
import * as InventoryController from '../controllers/inventorysController.js';

// Declare the routes
router.get('/', InventoryController.inventoryList);
router.post('/item', InventoryController.create);
router.delete('/delete/:id', InventoryController.destroy);
router.get('/item/:id', InventoryController.show);
router.put('/item/:id', InventoryController.update);

// Export
export default router;