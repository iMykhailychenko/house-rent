import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PostEntity } from '../../posts/entities/posts.entity';
import { UserEntity } from '../../users/entities/users.entity';

@Entity()
export class ChatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, user => user.chatsAuthor)
    author: UserEntity;

    @ManyToOne(() => UserEntity, user => user.chatsCompanion)
    companion: UserEntity;

    @ManyToOne(() => PostEntity, post => post.chats)
    post: PostEntity;
}
