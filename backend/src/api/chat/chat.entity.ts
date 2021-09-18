import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.chatsAuthor)
    author: User;

    @ManyToOne(() => User, user => user.chatsCompanion)
    companion: User;

    @ManyToOne(() => Post, post => post.chats)
    post: Post;
}
