import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Pagination } from '../../shared/interfaces/interface';
import { FavoriteEntity } from '../favorite/entities/favorite.entity';
import { UserEntity, UserRole } from '../users/entities/users.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { PersonalPostDto } from './dto/personal-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { StatusDto } from './dto/update-status.dto';
import { PostEntity } from './entities/posts.entity';
import { POST_STATUS } from './posts.interface';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(FavoriteEntity) private readonly favoriteRepository: Repository<FavoriteEntity>,
    ) {}

    getSqlQueryForSearch(searchFilters: SearchPostDto): SelectQueryBuilder<PostEntity> {
        return this.postRepository
            .createQueryBuilder('posts')
            .leftJoinAndSelect('posts.user', 'users')
            .loadRelationCountAndMap('posts.favorite', 'posts.favorite')
            .where('posts.status = :status', { status: POST_STATUS.ACTIVE })
            .andWhere('((:general)::text[] IS NULL OR (posts.generalFilters)::text[] @> (:general)::text[])', {
                general: searchFilters.general,
            })
            .andWhere(
                '(((:room)::text[] IS NULL) OR ((posts.roomFilters)::text[] @> (:room)::text[]) OR ((posts.roomFilters)::text[] <@ (:room)::text[]))',
                { room: searchFilters.room },
            )
            .andWhere('((:houseType)::text[] IS NULL OR (posts.houseTypeFilters)::text[] @> (:houseType)::text[])', {
                houseType: searchFilters.houseType,
            })
            .andWhere('((:city)::varchar IS NULL OR posts.cityFilters = :city)', { city: searchFilters.city })
            .andWhere(
                '(((:district)::text[] IS NULL) OR ((posts.districtFilters)::text[] <@ (:district)::text[]) OR ((posts.districtFilters)::text[] @> (:district)::text[]))',
                {
                    district: searchFilters.district,
                },
            )
            .andWhere(
                '(((:price)::text[] IS NULL) OR ((posts.priceFilters)::text[] @> (:price)::text[]) OR ((posts.priceFilters)::text[] <@ (:price)::text[]))',
                {
                    price: searchFilters.price,
                },
            )
            .andWhere(
                '(((:query)::varchar IS NULL OR LOWER(posts.title) like LOWER(:query)) OR ((:query)::varchar IS NULL OR LOWER(posts.description) like LOWER(:query)))',
                { query: searchFilters.query ? `%${searchFilters.query}%` : null },
            )
            .orderBy('posts.createdAt', 'DESC');
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
        const total = await sqlQuery.andWhere('users.id = :userId', { userId }).getCount();

        const { page = 1, limit = 20 } = searchPostDto;
        const result = await sqlQuery
            .andWhere('users.id = :userId', { userId })
            .offset(limit * (page - 1))
            .limit(limit)
            .getMany();

        return this.formatPagination(result, total, searchPostDto);
    }

    async findAllPersonal(userId: number, personalPostDto: PersonalPostDto): Promise<Pagination<PostEntity>> {
        const { limit, page, status } = personalPostDto;
        const [result, total] = await this.postRepository.findAndCount({
            relations: ['user'],
            where: {
                status: status,
                user: {
                    id: userId,
                },
            },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: limit * (page - 1),
        });

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: +page,
            data: result,
        };
    }

    async isPostInFavorite(postId: number, userId: number): Promise<boolean> {
        return !!(await this.favoriteRepository.findOne({ where: { post: postId, user: userId } }));
    }

    async addFavoriteFieldToPostsList(userId: number, postsList: Pagination<PostEntity>): Promise<Pagination<PostEntity>> {
        for await (const post of postsList.data) {
            post.isFavorite = await this.isPostInFavorite(post.id, userId);
        }
        return postsList;
    }

    async findByIdRead(postId: number): Promise<PostEntity> {
        const post = await this.postRepository
            .createQueryBuilder('posts')
            .where({ id: postId, status: POST_STATUS.ACTIVE })
            .leftJoinAndSelect('posts.user', 'user')
            .loadRelationCountAndMap('posts.favorite', 'posts.favorite')
            .getOne();

        if (!post) throw new HttpException('Post with this id do not exist', HttpStatus.NOT_FOUND);

        await this.postRepository
            .createQueryBuilder('posts')
            .update(PostEntity)
            .set({ views: () => 'views + 1' })
            .where({ id: postId })
            .execute();

        return { ...post, views: post.views + 1, isFavorite: false };
    }

    async findById(postId: number, userId: number): Promise<PostEntity> {
        const post = await this.postRepository
            .createQueryBuilder('posts')
            .where({ id: postId })
            .leftJoinAndSelect('posts.user', 'user')
            .loadRelationCountAndMap('posts.favorite', 'posts.favorite')
            .getOne();

        if (!post) throw new HttpException('Post with this id do not exist', HttpStatus.NOT_FOUND);
        if (post.status !== POST_STATUS.ACTIVE && post.user.id !== userId)
            throw new HttpException('Post with this id do not exist', HttpStatus.NOT_FOUND);

        await this.postRepository
            .createQueryBuilder('posts')
            .update(PostEntity)
            .set({ views: () => 'views + 1' })
            .where({ id: postId })
            .execute();

        post.isFavorite = await this.isPostInFavorite(post.id, userId);

        return { ...post, views: post.views + 1, isFavorite: false };
    }

    async createPost(userId: number, createPostDto: CreatePostDto): Promise<PostEntity> {
        const post = new PostEntity();
        Object.assign(post, createPostDto);
        post.user = await this.userRepository.findOne(userId);
        return await this.postRepository.save(post);
    }

    async updateUser(userId: number, postId: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
        const post = await this.postRepository.findOne(postId, { relations: ['user'] });
        if (post.user.id !== userId) {
            throw new HttpException('No permission', HttpStatus.FORBIDDEN);
        }
        Object.assign(post, updatePostDto);
        return await this.postRepository.save(post);
    }

    async updateStatus(userId: number, postId: number, statusDto: StatusDto): Promise<PostEntity> {
        const post = await this.postRepository.findOne(postId, { relations: ['user'] });
        if (post.user.id !== userId || !post.user.role.includes(UserRole.USER)) {
            throw new HttpException('No permission', HttpStatus.FORBIDDEN);
        }
        post.status = statusDto.status;
        return await this.postRepository.save(post);
    }

    async deletePost(userId: number, postId: number): Promise<void> {
        const post = await this.postRepository.findOne(postId, { relations: ['user'] });
        if (post.id !== postId) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        await this.postRepository.delete(post);
    }
}
