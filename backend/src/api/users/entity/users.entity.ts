import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsDate, IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { Post } from '../../posts/entity/posts.entity';

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

    @Column({ type: 'varchar', length: 50 })
    @Length(1, 50)
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    @Length(1, 100)
    lastName: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    @IsEmail()
    email: string;

    @Column({ type: 'varchar' })
    @IsString()
    password: string;

    @OneToMany(() => Post, posts => posts.user)
    posts: Post[];

    @Column({
        type: 'simple-array',
        default: [UserRole.USER],
    })
    role: UserRole[];
}
