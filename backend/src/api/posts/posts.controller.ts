import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';

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
    async findAll(@SearchPost() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAll(searchFilters);
    }

    @Get('users/:userId')
    async findAllForUser(
        @Param('userId', ParseIntPipe) userId: number,
        @SearchPost() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAllForUser(userId, searchFilters);
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

    @Get('favorite')
    @UseGuards(AuthGuard)
    async findFavorite(
        @User('id') userId: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.findFavorite(userId, page, limit);
    }

    @Get(':postId')
    async findById(@Param('postId', ParseIntPipe) postId: number): Promise<PostEntity> {
        return await this.postsService.findById(postId);
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
        return await this.postsService.updatePost(userId, postId, updatePostDto);
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

    @Delete(':postId')
    @UseGuards(AuthGuard)
    async deletePost(@User('id') userId: number, @Param('postId', ParseIntPipe) postId: number): Promise<void> {
        await this.postsService.deletePost(userId, postId);
    }
}
