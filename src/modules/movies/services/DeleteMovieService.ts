import MoviesRepository from "@modules/movies/typeorm/repositories/MoviesRepository";
import AppError from "src/shared/errors/AppError";

import { getCustomRepository } from "typeorm";

interface IRequest{
    id: string;
}

export default class DeleteMovieService{
    public async execute({id} : IRequest) : Promise<void>{

        const movieRepository = getCustomRepository(MoviesRepository);

        const movie = await movieRepository.findOne(id);
        if(!movie){
            throw new AppError('Product not found');
        }
        await movieRepository.remove(movie);
    }
}