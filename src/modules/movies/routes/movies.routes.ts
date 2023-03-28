import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import MoviesController from "../controllers/MoviesController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const moviesRouter = Router();
const moviesController = new MoviesController();


moviesRouter.get('/', moviesController.index);

moviesRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}), moviesController.show);

moviesRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        year: Joi.number().required(),
        director: Joi.string().required(),
        studio: Joi.string().required(),
        duration: Joi.number().required(),
        genre: Joi.string().required()
    }
}), moviesController.create);

moviesRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()},
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        year: Joi.number().required(),
        director: Joi.string().required(),
        studio: Joi.string().required(),
        duration: Joi.number().required(),
        genre: Joi.string().required()
    }
}), moviesController.update);

moviesRouter.delete('/:id',celebrate({
    [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}), moviesController.delete);

export default moviesRouter;