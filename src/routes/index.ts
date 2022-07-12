import { Router } from 'express';
import UserRoute from './api/User.routes';
const router = Router();
router.use('/user', UserRoute);
export default router;
