import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate, IsOptional, IsString, Length } from 'class-validator';
import { User } from '../../users/entity/users.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: new Date() })
    @IsDate()
    @IsOptional()
    creationDate: Date;

    @Column({ type: 'varchar', length: 100 })
    @Length(1, 100)
    title: string;

    @Column({ type: 'varchar' })
    @IsString()
    description: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;
}
