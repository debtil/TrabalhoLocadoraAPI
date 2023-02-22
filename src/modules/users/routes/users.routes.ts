import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import UsersController from "../controllers/UsersController";
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarController from "../controllers/UserAvatarController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";


const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig);


usersRouter.get('/', usersController.index);

usersRouter.post('/', celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }}), usersController.create);

  usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), usersAvatarController.update);

export default usersRouter;
