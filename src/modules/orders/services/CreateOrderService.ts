import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import MoviesRepository from "@modules/movies/typeorm/repositories/MoviesRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface IMovie{
    id: string;
    price: number;
  }
  interface IRequest{
    customer_id: string;
    movies: IMovie[];
  }
  
  export default class CreateOrderService{
    public async execute({customer_id, movies}: IRequest) : Promise<Order>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const moviesRepository = getCustomRepository(MoviesRepository);

        const customerExists = await customersRepository.findById(customer_id);
        if(!customerExists){
        throw new AppError('Could not find any customer with the given ids.');
        }

        const existsMovies = await moviesRepository.findAllByIds(movies);
        if(!existsMovies.length){
        throw new AppError('Could not find any movies with the given ids.');
        }

        const existsMoviesIds = existsMovies.map((movie)=> movie.id);
        const checkInexistentMovies = movies.filter(
            movie => !existsMoviesIds.includes(movie.id)
        );

        if(!existsMoviesIds.length){
            throw new AppError(`Could not find movie ${checkInexistentMovies[0].id}.`);
        }

        const serializerMovies = movies.map(movie =>({
            movie_id : movie.id,
            price: existsMovies.filter(mv => mv.id === movie.id)[0].price
        }));
        
        const order = await ordersRepository.createOrder({
            customer: customerExists,
            movies: serializerMovies
        });
      
        return order;
    }
  }