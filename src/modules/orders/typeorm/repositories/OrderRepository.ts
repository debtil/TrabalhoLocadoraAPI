
import Customer from "@modules/customers/typeorm/entities/Customer";
import { EntityRepository, Repository } from "typeorm";
import Order from "../entities/Order";

interface IMovie{
    movie_id:string;
    price: number;
}

interface IRequest{
    customer: Customer;
    movies: IMovie[];
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order>{
    public async findById(id:string): Promise<Order|undefined>{
        const order = this.findOne(id,{
            relations:['order_movies','customer']
        });
        return order;
    }
    public async createOrder({customer,movies}:IRequest):Promise<Order>{
        const order = this.create({customer,order_movies: movies});
        await this.save(order);
        return order;
    }
}
