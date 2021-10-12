import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min, Validate } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import {
    City,
    DISTRICT_FILTERS,
    GENERAL_FILTERS,
    HOUSE_TYPE_FILTERS,
    POST_STATUS,
    PRICE_FILTERS,
    ROOM_FILTERS,
} from '../../../interfaces/posts.interface';
import { ChatEntity } from '../../chats/entities/chats.entity';
import { FavoriteEntity } from '../../favorite/entities/favorite.entity';
import { UserEntity } from '../../users/entities/users.entity';
import { DistrictValidator } from '../posts.validate';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: POST_STATUS.IDLE })
    @IsEnum(POST_STATUS)
    @IsOptional()
    status: string;

    @Column({ type: 'timestamp', default: new Date() })
    @IsDate()
    @IsOptional()
    creationDate: Date;

    @Column({ type: 'int', default: 0 })
    @IsInt()
    @IsOptional()
    views: number;

    @Column({ type: 'varchar', length: 300 })
    @Length(1, 300)
    title: string;

    @Column({ type: 'varchar' })
    @IsString()
    description: string;

    @Column({ type: 'int' })
    @IsInt()
    @Min(0)
    @Max(15)
    residentsAmount: number;

    @Column({ type: 'varchar', default: null, nullable: true })
    @IsString()
    @IsOptional()
    children: string;

    @Column({ type: 'varchar', default: null, nullable: true })
    @IsString()
    @IsOptional()
    pets: string;

    @Column({ type: 'varchar', default: null, nullable: true })
    @IsString()
    @IsOptional()
    image: string;

    @Column('text', { array: true, nullable: true })
    @IsArray()
    @IsEnum(GENERAL_FILTERS, { each: true })
    @IsOptional()
    generalFilters: GENERAL_FILTERS[];

    @Column('text', { array: true, nullable: true })
    @IsArray()
    @IsEnum(ROOM_FILTERS, { each: true })
    @IsOptional()
    roomFilters: ROOM_FILTERS[];

    @Column('text', { array: true, nullable: true })
    @IsArray()
    @IsEnum(HOUSE_TYPE_FILTERS, { each: true })
    @IsOptional()
    houseTypeFilters: HOUSE_TYPE_FILTERS[];

    @Column('text', { array: true, nullable: true })
    @IsArray()
    @IsEnum(PRICE_FILTERS, { each: true })
    @IsOptional()
    priceFilters: PRICE_FILTERS[];

    @Column({ type: 'varchar', nullable: true })
    @IsString()
    @IsOptional()
    cityFilters: City;

    @Column('text', { array: true, nullable: true })
    @IsArray()
    @Validate(DistrictValidator)
    @IsOptional()
    districtFilters: DISTRICT_FILTERS[];

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;

    @OneToMany(() => ChatEntity, chats => chats.post)
    chats: ChatEntity[];

    @IsBoolean()
    @IsOptional()
    isFavorite: boolean;

    @OneToMany(() => FavoriteEntity, favorite => favorite.post)
    favorite: FavoriteEntity[];
}
