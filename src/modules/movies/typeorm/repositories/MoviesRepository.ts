import { EntityRepository, Repository } from "typeorm";
import Movie from "../entities/Movie";

@EntityRepository(Movie)
export default class MoviesRepository extends Repository<Movie>{
    public async findByName(name:string): Promise<Movie | undefined>{
        const movie = await this.findOne({
            where:{name}
        })
        return movie;
    }
}