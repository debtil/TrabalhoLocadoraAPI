import Movie from "@modules/movies/typeorm/entities/Movie";
import MoviesRepository from "@modules/movies/typeorm/repositories/MoviesRepository";
import AppError from "src/shared/errors/AppError";

import { getCustomRepository } from "typeorm";

interface IRequest{
    id: string;
    name: string;
    price: number;
    year: number;
    director: string;
    studio: string;
    duration: number;
    genre: string;
}

export default class UpdateMovieService{
    public async execute({id, name, price, year, director, studio, duration, genre}: IRequest): Promise<Movie>{
        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findOne(id);
        if(!movie){
            throw new AppError('Movie not found');
        }

        const movieExists = await movieRepository.findByName(name);
        if(movieExists && name != movie.name){
            throw new AppError('There is already a movie with the name ' + name);
        }
        movie.name = name;
        movie.price = price;
        movie.year = year;
        movie.director = director;
        movie.studio = studio;
        movie.duration = duration;
        movie.genre = genre;

        await movieRepository.save(movie);

        return movie;
    }
}