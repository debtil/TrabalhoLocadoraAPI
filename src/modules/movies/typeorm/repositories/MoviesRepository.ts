import { EntityRepository, In, Repository } from "typeorm";
import Movie from "../entities/Movie";

interface IFindMovies{
    id: string;
  }

@EntityRepository(Movie)
export default class MoviesRepository extends Repository<Movie>{
    public async findByName(name:string): Promise<Movie | undefined>{
        const movie = await this.findOne({
            where:{name}
        })
        return movie;
    }

    public async findAllByIds(movies: IFindMovies[]): Promise<Movie[]>{
        const moviesIds = movies.map(movie => movie.id);
        const existsMovies = await this.find({
          where:{
            id: In(moviesIds),
          }
        })
        return existsMovies;
      }

}

