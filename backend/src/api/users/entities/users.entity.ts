import bcrypt from 'bcrypt';
import authConfig from 'src/config/auth.config';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ChatEntity } from '../../chats/entities/chats.entity';
import { FavoriteEntity } from '../../favorite/entities/favorite.entity';
import { PostEntity } from '../../posts/entities/posts.entity';

export enum UserRole {
    USER = 'user',
    REALTOR = 'realtor',
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: new Date() })
    creationDate: Date;

    @Column({ type: 'timestamp', default: new Date() })
    lastActivity: Date;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    @Column({ type: 'boolean', default: false })
    isEmailVerified: boolean;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', select: false })
    password: string;

    @OneToMany(() => PostEntity, posts => posts.user)
    posts: PostEntity[];

    @OneToMany(() => ChatEntity, chats => chats.author)
    chatsAuthor: ChatEntity[];

    @OneToMany(() => ChatEntity, chats => chats.companion)
    chatsCompanion: ChatEntity[];

    @OneToMany(() => FavoriteEntity, favorite => favorite.user)
    favorite: FavoriteEntity[];

    @Column({
        type: 'simple-array',
        nullable: true,
    })
    role: UserRole[];

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, authConfig.saltRounds);
    }
}
