import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/posts.entity';
import { User } from '../users/users.entity';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Post, post => post.favorite)
    post: Post;

    @OneToMany(() => User, user => user.favorite)
    user: User;
}
