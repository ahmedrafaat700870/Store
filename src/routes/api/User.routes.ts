import { Router } from 'express';
import * as Controllers from '../../controllers/User.controllers';
const UserRoute = Router();
UserRoute.post('/', Controllers.Create)
  .get('/all', Controllers.GetAll)
  .get('/', Controllers.GetAll)
  .put('/', Controllers.Update)
  .get('/:id', Controllers.Get)
  .delete('/:id', Controllers.Delete)
  .delete('/', Controllers.DeleteAll);
export default UserRoute;
