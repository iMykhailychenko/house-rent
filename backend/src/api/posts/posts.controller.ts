import { Controller, Get, Param, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { User } from '../../decorators/users.decorator';
import { AuthGuard } from '../../guards/auth.guards';
import { Pagination } from '../../interfaces/app.interface';

import { SearchPostDto } from './dto/search-post.dto';
import { PostEntity } from './entities/posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAll(@User('id') userId: number, @Query() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        return await this.postsService.addFavoriteField(userId, await this.postsService.findAll(searchFilters));
    }

    @Get('read')
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAllRead(@Query() searchFilters: SearchPostDto): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAll(searchFilters);
    }

    @Get('user/:userId')
    @UsePipes(new ValidationPipe())
    async findAllForUser(
        @User('id') currentUserId: number,
        @Param('userId') userId: number,
        @Query() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.addFavoriteField(
            currentUserId,
            await this.postsService.findAllForUser(userId, searchFilters),
        );
    }

    @Get('user/:userId/read')
    @UsePipes(new ValidationPipe())
    async findAllForUserRead(
        @Param('userId') userId: number,
        @Query() searchFilters: SearchPostDto,
    ): Promise<Pagination<PostEntity>> {
        return await this.postsService.findAllForUser(userId, searchFilters);
    }
}
