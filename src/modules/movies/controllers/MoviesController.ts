import { Request, Response } from "express";
import CreateMovieService from "../services/CreateMovieService";
import DeleteMovieService from "../services/DeleteMovieService";
import ListMovieService from "../services/ListMovieService";
import ShowMovieService from "../services/ShowMovieService";
import UpdateMovieService from "../services/UpdateMovieService";


export default class MoviesController{
    public async index(request: Request, response: Response): Promise<Response>{
        const listMovies = new ListMovieService();
        const movies = await listMovies.execute();
        return response.json(movies);
    }

    public async show(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const showMovie = new ShowMovieService();
        const movie = await showMovie.execute({id});
        return response.json(movie);
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const {name, price, year, director, studio, duration, genre} = request.body;
        const createMovie = new CreateMovieService();
        const movie = await createMovie.execute({name, price, year, director, studio, duration, genre});
        return response.json(movie);
    }

    public async update(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const {name, price, year, director, studio, duration, genre} = request.body;
        const updateMovie = new UpdateMovieService();
        const movie = await updateMovie.execute({id, name, price, year, director, studio, duration, genre});
        return response.json(movie);
    }

    public async delete(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const deleteMovie = new DeleteMovieService();
        await deleteMovie.execute({id});
        return response.json([]);
    }
}