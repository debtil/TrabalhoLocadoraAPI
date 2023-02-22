import Movie from "@modules/movies/typeorm/entities/Movie";
import MoviesRepository from "@modules/movies/typeorm/repositories/MoviesRepository";
import { getCustomRepository } from "typeorm";

export default class ListMovieService{
    public async execute() : Promise<Movie[]>{

        const movieRepository = getCustomRepository(MoviesRepository);

        const movies = await movieRepository.find();
        return movies;
    }
}