import { IsBoolean } from 'class-validator';
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
import { FavoriteEntity } from '../../favorite/entities/favorite.entity';
import { UserEntity } from '../../users/entities/users.entity';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { array: true, default: [POST_STATUS.IDLE] })
    status: POST_STATUS[];

    @Column({ type: 'timestamp', default: new Date() })
    creationDate: Date;

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'varchar', length: 300 })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'int' })
    residentsAmount: number;

    @Column({ type: 'varchar', default: null, nullable: true })
    children: string;

    @Column({ type: 'varchar', default: null, nullable: true })
    pets: string;

    @Column({ type: 'varchar', default: null, nullable: true })
    image: string;

    @Column('text', { array: true, nullable: true })
    generalFilters: GENERAL_FILTERS[];

    @Column('text', { array: true, nullable: true })
    roomFilters: ROOM_FILTERS[];

    @Column('text', { array: true, nullable: true })
    houseTypeFilters: HOUSE_TYPE_FILTERS[];

    @Column('text', { array: true, nullable: true })
    priceFilters: PRICE_FILTERS[];

    @Column({ type: 'varchar', nullable: true })
    cityFilters: City;

    @Column('text', { array: true, nullable: true })
    districtFilters: DISTRICT_FILTERS[];

    @ManyToOne(() => UserEntity, user => user.posts)
    user: UserEntity;

    @IsBoolean()
    isFavorite: boolean;

    @OneToMany(() => FavoriteEntity, favorite => favorite.post)
    favorite: FavoriteEntity[];
}
