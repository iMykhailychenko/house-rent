import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional, IsString, Length, Validate } from 'class-validator';
import { User } from '../../users/entity/users.entity';
import { City, DISTRICT_FILTERS, GENERAL_FILTERS, HOUSE_TYPE_FILTERS, PRICE_FILTERS, ROOM_FILTERS } from '../posts.interface';
import { DistrictValidator } from '../posts.validate';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

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

    @Column({ type: 'simple-array', default: [], nullable: true })
    @IsArray()
    @IsEnum(GENERAL_FILTERS, { each: true })
    @IsOptional()
    generalFilters: GENERAL_FILTERS[];

    @Column({ type: 'simple-array' })
    @IsArray()
    @IsEnum(ROOM_FILTERS, { each: true })
    roomFilters: ROOM_FILTERS[];

    @Column({ type: 'simple-array' })
    @IsArray()
    @IsEnum(HOUSE_TYPE_FILTERS, { each: true })
    houseTypeFilters: HOUSE_TYPE_FILTERS[];

    @Column({ type: 'simple-array' })
    @IsArray()
    @IsEnum(PRICE_FILTERS, { each: true })
    priceFilters: PRICE_FILTERS[];

    @Column({ type: 'varchar' })
    @IsString()
    cityFilters: City;

    @Column({ type: 'simple-array' })
    @IsArray()
    @Validate(DistrictValidator)
    districtFilters: DISTRICT_FILTERS[];

    @ManyToOne(() => User, user => user.posts)
    user: User;
}
