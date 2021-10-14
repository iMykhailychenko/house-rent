import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { User } from '../../decorators/users.decorator';
import { AuthGuard } from '../../guards/auth.guards';
import { Pagination } from '../../interfaces/app.interface';

import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { StatusDto } from './dto/update-status.dto';
import { PostEntity } from './entities/posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAll(@User('id') userId: number, @Query() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        return await this.postsService.addFavoriteFieldToPostsList(userId, await this.postsService.findAll(searchFilters));
    }

    @Get('read')
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAllRead(@Query() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAll(searchFilters);
    }

    @Get('users/:userId')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    async findAllForUser(
        @User('id') currentUserId: number,
        @Param('userId') userId: number,
        @Query() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.addFavoriteFieldToPostsList(
            currentUserId,
            await this.postsService.findAllForUser(userId, searchFilters),
        );
    }

    @Get('read/users/:userId')
    @UsePipes(new ValidationPipe())
    async findAllForUserRead(
        @Param('userId') userId: number,
        @Query() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAllForUser(userId, searchFilters);
    }

    @Get('read/:postId')
    async findByIdRead(@Param('postId') postId: number): Promise<PostEntity> {
        return await this.postsService.findById(postId);
    }

    @Get(':postId')
    @UseGuards(AuthGuard)
    async findById(@User('id') userId: number, @Param('postId') postId: number): Promise<PostEntity> {
        return await this.postsService.addFavoriteFieldToSinglePosts(userId, await this.postsService.findById(postId));
    }

    @Post('')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async createPost(@User('id') userId: number, @Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        return await this.postsService.createPost(userId, createPostDto);
    }

    @Put(':postId')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updatePost(
        @User('id') userId: number,
        @Param('postId') postId: number,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostEntity> {
        return await this.postsService.updateUser(userId, postId, updatePostDto);
    }

    @Put(':postId/status')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateStatus(
        @User('id') userId: number,
        @Param('postId') postId: number,
        @Body() statusDto: StatusDto,
    ): Promise<PostEntity> {
        return await this.postsService.updateStatus(userId, postId, statusDto);
    }
}
