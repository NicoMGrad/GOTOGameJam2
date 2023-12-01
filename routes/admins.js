import express from 'express';
import AdminsControllers from '../controllers/admins.js';
import { adminExistsMiddleware } from '../controllers/middlewares.js';

const router = express.Router();

router.post('/admin/', [ adminExistsMiddleware ], AdminsControllers.registerAdmin);
router.post('/admin/login', AdminsControllers.loginAdmin);
router.get('/admin/:id', AdminsControllers.getAdminDetails);

export default router;
