import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { FavoriteEntity } from '../../favorite/entities/favorite.entity';
import { UserEntity } from '../../users/entities/users.entity';
import {
    City,
    DISTRICT_FILTERS,
    GENERAL_FILTERS,
    HOUSE_TYPE_FILTERS,
    POST_STATUS,
    PRICE_FILTERS,
    RESIDENTS_AMOUNT,
    ROOM_FILTERS,
} from '../posts.interface';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', default: POST_STATUS.DRAFT })
    status: POST_STATUS;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'int', default: 0 })
    views: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    residentsAmount: RESIDENTS_AMOUNT;

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

    @OneToMany(() => FavoriteEntity, favorite => favorite.post)
    favorite: FavoriteEntity[];
}
