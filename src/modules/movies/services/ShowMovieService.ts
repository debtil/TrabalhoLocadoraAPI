import Movie from "@modules/movies/typeorm/entities/Movie";
import MoviesRepository from "@modules/movies/typeorm/repositories/MoviesRepository";
import AppError from "src/shared/errors/AppError";

import { getCustomRepository } from "typeorm";

interface IRequest{
    id: string;
}

export default class ShowMovieService{
    public async execute({id} : IRequest) : Promise<Movie>{

        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findOne(id);
        if(!movie){
            throw new AppError('Movie not found');
        }

        return movie;
    }
}