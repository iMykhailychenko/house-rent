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

    @Column({ type: 'timestamp', default: new Date() })
    @IsDate()
    creationDate: Date;

    @Column({ type: 'timestamp', default: new Date() })
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

    @Column('varchar', { length: 50 })
    @IsString()
    password: string;

    @Column({
        type: 'set',
        enum: UserRole,
        default: [UserRole.USER],
    })
    role: UserRole[];
}
