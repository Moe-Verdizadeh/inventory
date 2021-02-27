// Initializing express
import express from 'express';
const app = express();

// Separated routes
import inventoryRoutes from './routes/inventoryRoutes.js';
import authenticationRoutes from './routes/authenticationRoutes.js';

// Register each route
app.use('/inventory', inventoryRoutes);
app.use('/login', authenticationRoutes);

export default app;