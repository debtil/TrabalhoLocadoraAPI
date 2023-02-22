import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('movies')
export default class Movie{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column() //faz automaticamente o mapeamento para varchar
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