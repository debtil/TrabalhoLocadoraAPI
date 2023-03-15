
import Movie from "@modules/movies/typeorm/entities/Movie";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";

@Entity('orders_movies')
export default class OrderMovies{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(()=> Order, order => order.order_movies)
  @JoinColumn({name: 'order_id'})
  order: Order;
  @ManyToOne(()=> Movie, movie => movie.order_movies)
  @JoinColumn({name: 'movie_id'})
  movie: Movie;
  @Column()
  order_id: string;
  @Column()
  movie_id: string;
  @Column('decimal')
  price: number;
  @Column()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}