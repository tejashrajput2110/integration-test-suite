import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "user" })
  role!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

}