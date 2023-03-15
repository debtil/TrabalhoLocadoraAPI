import Customer from "@modules/customers/typeorm/entities/Customer";
import {Column,Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn,UpdateDateColumn} from "typeorm";
import OrderMovies from "./OrderMovies";

@Entity("orders")
export default class Order{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @ManyToOne(()=>Customer)
    @JoinColumn({name:'customer_id'})
    customer: Customer;
    @OneToMany(()=>OrderMovies,order_movies=>order_movies.order,{cascade:true})
    order_movies: OrderMovies[];
    @Column()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
