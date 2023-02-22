import Movie from "@modules/movies/typeorm/entities/Movie";
import MoviesRepository from "@modules/movies/typeorm/repositories/MoviesRepository";
import AppError from "src/shared/errors/AppError";

import { getCustomRepository } from "typeorm";

interface IRequest{
    name: string;
    price: number;
    year: number;
    director: string;
    studio: string;
    duration: number;
    genre: string;
}

export default class CreateMovieService {
    public async execute({name, price, year, director, studio, duration, genre}: IRequest): Promise<Movie> {
        const movieRepository = getCustomRepository(MoviesRepository);

        const movieExists = await movieRepository.findByName(name);

        if(movieExists) {
            throw new AppError('There is already a movie with the name ' + name)
        }
        const movie = movieRepository.create({
            name, price, year, director, studio, duration, genre
        });
        await movieRepository.save(movie);
        return movie;
    }
}