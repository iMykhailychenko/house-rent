import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, Length, Validate } from 'class-validator';
import { User } from '../users/users.entity';
import {
    City,
    DISTRICT_FILTERS,
    GENERAL_FILTERS,
    HOUSE_TYPE_FILTERS,
    POST_STATUS,
    PRICE_FILTERS,
    ROOM_FILTERS,
} from './posts.interface';
import { DistrictValidator } from './posts.validate';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: POST_STATUS.IDLE })
    @IsEnum(POST_STATUS)
    @IsOptional()
    status: string;

    @Column({ type: 'varchar', length: 100 })
    @Length(1, 100)
    title: string;

    @Column({ type: 'varchar' })
    @IsString()
    description: string;

    @Column({ type: 'timestamp', default: new Date() })
    @IsDate()
    @IsOptional()
    creationDate: Date;

    @Column({ type: 'int', default: 0 })
    @IsNumber()
    @IsOptional()
    views: number;

    @Column({ type: 'varchar', default: null, nullable: true })
    @IsString()
    @IsOptional()
    image: string;

    @Column({ type: 'simple-array', default: null, nullable: true })
    @IsArray()
    @IsEnum(GENERAL_FILTERS, { each: true })
    @IsOptional()
    generalFilters: GENERAL_FILTERS[];

    @Column({ type: 'simple-array', default: null, nullable: true })
    @IsArray()
    @IsEnum(ROOM_FILTERS, { each: true })
    @IsOptional()
    roomFilters: ROOM_FILTERS[];

    @Column({ type: 'simple-array', default: null, nullable: true })
    @IsArray()
    @IsEnum(HOUSE_TYPE_FILTERS, { each: true })
    @IsOptional()
    houseTypeFilters: HOUSE_TYPE_FILTERS[];

    @Column({ type: 'simple-array', default: null, nullable: true })
    @IsArray()
    @IsEnum(PRICE_FILTERS, { each: true })
    @IsOptional()
    priceFilters: PRICE_FILTERS[];

    @Column({ type: 'varchar', default: null, nullable: true })
    @IsString()
    @IsOptional()
    cityFilters: City;

    @Column({ type: 'simple-array', default: null, nullable: true })
    @IsArray()
    @Validate(DistrictValidator)
    @IsOptional()
    districtFilters: DISTRICT_FILTERS[];

    @ManyToOne(() => User, user => user.posts)
    user: User;
}
