import OrderMovies from "@modules/orders/typeorm/entities/OrderMovies";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('movies')
export default class Movie{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToMany(()=>OrderMovies,order_movies=>order_movies.movie)
    order_movies:OrderMovies[];
    @Column() 
    name: string;
    @Column('decimal')
    price: number;
    @Column('int')
    year: number;
    @Column()
    director: string;
    @Column()
    studio: string;
    @Column('int')
    duration: number;
    @Column()
    genre: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}