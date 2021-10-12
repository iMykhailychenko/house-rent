import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Pagination } from '../../interfaces/app.interface';
import { POST_STATUS } from '../../interfaces/posts.interface';
import { FavoriteEntity } from '../favorite/entities/favorite.entity';

import { SearchPostDto } from './dto/search-post.dto';
import { PostEntity } from './entities/posts.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(FavoriteEntity) private readonly favoriteRepository: Repository<FavoriteEntity>,
    ) {}

    getSqlQueryForSearch(searchFilters: SearchPostDto): SelectQueryBuilder<PostEntity> {
        return this.postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .loadRelationCountAndMap('post.favorite', 'post.favorite')
            .loadRelationCountAndMap('post.chats', 'post.chats')
            .where('post.status = :status', { status: POST_STATUS.IDLE })
            .andWhere('((:general)::text[] IS NULL OR (post.generalFilters)::text[] @> (:general)::text[])', {
                general: searchFilters.general,
            })
            .andWhere('((:room)::text[] IS NULL OR (post.roomFilters)::text[] @> (:room)::text[])', { room: searchFilters.room })
            .andWhere('((:houseType)::text[] IS NULL OR (post.houseTypeFilters)::text[] @> (:houseType)::text[])', {
                houseType: searchFilters.houseType,
            })
            .andWhere('((:city)::varchar IS NULL OR post.cityFilters = :city)', { city: searchFilters.city })
            .andWhere('((:district)::text[] IS NULL OR (post.districtFilters)::text[] @> (:district)::text[])', {
                district: searchFilters.district,
            })
            .andWhere('((:price)::text[] IS NULL OR (post.priceFilters)::text[] @> (:price)::text[])', {
                price: searchFilters.price,
            })
            .andWhere(
                '(((:query)::varchar IS NULL OR LOWER(post.title) like LOWER(:query)) OR ((:query)::varchar IS NULL OR LOWER(post.description) like LOWER(:query)))',
                { query: searchFilters.query ? `%${searchFilters.query}%` : null },
            )
            .orderBy('post.creationDate', 'DESC');
    }

    formatPagination<T>(data: T[], total: number, searchPostDto: SearchPostDto): Pagination<T> {
        return {
            totalItems: total,
            totalPages: Math.ceil(total / searchPostDto.limit),
            currentPage: searchPostDto.page,
            data: data || [],
        };
    }

    async findAll(searchPostDto: SearchPostDto): Promise<Pagination<PostEntity>> {
        const sqlQuery = await this.getSqlQueryForSearch(searchPostDto);
        const total = await sqlQuery.getCount();

        const { page = 1, limit = 20 } = searchPostDto;
        const result = await sqlQuery
            .offset(limit * (page - 1))
            .limit(limit)
            .getMany();

        return this.formatPagination(result, total, searchPostDto);
    }

    async findAllForUser(userId: number, searchPostDto: SearchPostDto): Promise<Pagination<PostEntity>> {
        const sqlQuery = await this.getSqlQueryForSearch(searchPostDto);
        const total = await sqlQuery.andWhere('user.id = :userId', { userId }).getCount();

        const { page = 1, limit = 20 } = searchPostDto;
        const result = await sqlQuery
            .andWhere('user.id = :userId', { userId })
            .offset(limit * (page - 1))
            .limit(limit)
            .getMany();

        return this.formatPagination(result, total, searchPostDto);
    }

    async addFavoriteField(userId: number, postsList: Pagination<PostEntity>): Promise<Pagination<PostEntity>> {
        for await (const post of postsList.data) {
            post.isFavorite = !!(await this.favoriteRepository.findOne({ where: { post: post.id, user: userId } }));
        }

        return postsList;
    }
}
