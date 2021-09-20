import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../posts/posts.entity';
import { User } from '../users/users.entity';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, post => post.favorite, { onDelete: 'CASCADE' })
    post: Post;

    @ManyToOne(() => User, user => user.favorite, { onDelete: 'CASCADE' })
    user: User;
}
