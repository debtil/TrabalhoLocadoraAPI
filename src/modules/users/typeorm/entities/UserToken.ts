import { Entity, PrimaryGeneratedColumn, Column, Generated, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('user_tokens')
export default class UserToken{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @Generated('uuid')
  token: string;
  @Column()
  user_id: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
