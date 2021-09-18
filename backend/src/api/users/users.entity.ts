import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsDate, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Post } from '../posts/posts.entity';
import { Chat } from '../chat/chat.entity';

export enum UserRole {
    USER = 'user',
    REALTOR = 'realtor',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: new Date() })
    @IsDate()
    @IsOptional()
    creationDate: Date;

    @Column({ type: 'timestamp', default: new Date() })
    @IsDate()
    @IsOptional()
    lastActivity: Date;

    @Column({ type: 'varchar', nullable: true })
    @IsString()
    @IsOptional()
    avatar: string;

    @Column({ type: 'varchar', length: 50 })
    @Length(1, 50)
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    @Length(1, 100)
    lastName: string;

    @Column({ type: 'boolean', default: false })
    @IsBoolean()
    @IsOptional()
    isEmailVerified: boolean;

    @Column({ type: 'varchar', length: 50, unique: true })
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', select: false })
    @IsString()
    password: string;

    @OneToMany(() => Post, posts => posts.user)
    posts: Post[];

    @OneToMany(() => Chat, chats => chats.author)
    chatsAuthor: Chat[];

    @OneToMany(() => Chat, chats => chats.companion)
    chatsCompanion: Chat[];

    @Column({
        type: 'simple-array',
        nullable: true,
    })
    @IsOptional()
    role: UserRole[];
}
