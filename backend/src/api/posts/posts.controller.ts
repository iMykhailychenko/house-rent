import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';

import { SearchPost } from '../../shared/decorators/search-post.decorator';
import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { Pagination } from '../../shared/interfaces/interface';

import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { StatusDto } from './dto/update-status.dto';
import { PostEntity } from './entities/posts.entity';
import { POST_STATUS } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('')
    @UseGuards(AuthGuard)
    async findAll(@User('id') userId: number, @SearchPost() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        return await this.postsService.addFavoriteFieldToPostsList(userId, await this.postsService.findAll(searchFilters));
    }

    @Get('read')
    async findAllRead(@SearchPost() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAll(searchFilters);
    }

    @Get('users/:userId')
    @UseGuards(AuthGuard)
    async findAllForUser(
        @User('id') currentUserId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @SearchPost() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.addFavoriteFieldToPostsList(
            currentUserId,
            await this.postsService.findAllForUser(userId, searchFilters),
        );
    }

    @Get('personal')
    @UseGuards(AuthGuard)
    async findAllPersonal(
        @User('id') userId: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('status') status: POST_STATUS,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAllPersonal(userId, { page, limit, status });
    }

    @Get('read/users/:userId')
    async findAllForUserRead(
        @Param('userId', ParseIntPipe) userId: number,
        @SearchPost() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAllForUser(userId, searchFilters);
    }

    @Get('read/:postId')
    async findByIdRead(@Param('postId', ParseIntPipe) postId: number): Promise<PostEntity> {
        return await this.postsService.findById(postId);
    }

    @Get(':postId')
    @UseGuards(AuthGuard)
    async findById(@User('id') userId: number, @Param('postId', ParseIntPipe) postId: number): Promise<PostEntity> {
        return await this.postsService.addFavoriteFieldToSinglePosts(userId, await this.postsService.findById(postId));
    }

    @Post('')
    @UseGuards(AuthGuard)
    async createPost(
        @User('id') userId: number,
        @Body(new ValidationPipe({ transform: true })) createPostDto: CreatePostDto,
    ): Promise<PostEntity> {
        return await this.postsService.createPost(userId, createPostDto);
    }

    @Put(':postId')
    @UseGuards(AuthGuard)
    async updatePost(
        @User('id') userId: number,
        @Param('postId', ParseIntPipe) postId: number,
        @Body(new ValidationPipe({ transform: true })) updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return await this.postsService.updateUser(userId, postId, updatePostDto);
    }

    @Put(':postId/status')
    @UseGuards(AuthGuard)
    async updateStatus(
        @User('id') userId: number,
        @Param('postId', ParseIntPipe) postId: number,
        @Body(new ValidationPipe({ transform: true })) statusDto: StatusDto,
    ): Promise<PostEntity> {
        return await this.postsService.updateStatus(userId, postId, statusDto);
    }
}
