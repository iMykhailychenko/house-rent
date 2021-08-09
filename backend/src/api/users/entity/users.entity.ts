import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsDate, IsEmail, IsString, Length } from 'class-validator';

export enum UserRole {
    USER = 'user',
    REALTOR = 'realtor',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: new Date() })
    @IsDate()
    createDate: Date;

    @Column({ default: new Date() })
    @IsDate()
    lastActivity: Date;

    @Column('varchar', { length: 50 })
    @Length(1, 50)
    firstName: string;

    @Column('varchar', { length: 100 })
    @Length(1, 100)
    lastName: string;

    @Column('varchar', { length: 50 })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    password: string;

    @Column({
        type: 'set',
        enum: UserRole,
        default: [UserRole.USER],
    })
    role: UserRole[];
}
