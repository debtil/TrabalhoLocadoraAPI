
import { Router } from 'express';
import {celebrate, Joi, Segments} from 'celebrate';
import OrderController from '../controllers/OrderController';
import isAuthenticadted from '@shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrderController();

ordersRouter.use(isAuthenticadted);
ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
  }),
  ordersController.show);

  ordersRouter.post('/',
celebrate({
  [Segments.BODY] : {
  customer_id: Joi.string().required(),
  movies: Joi.required()
  }
})
,ordersController.create);

export default ordersRouter;