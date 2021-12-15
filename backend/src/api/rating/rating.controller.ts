import { Controller, Get, Put, Param, Post, ParseIntPipe, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guards';

import { User } from '../../shared/decorators/users.decorator';

import { CrateRatingDto } from './dto/crate-rating.dto';
import { UserRating } from './rating.interface';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Get(':userId')
    async findOne(@Param('userId', ParseIntPipe) userId: number): Promise<UserRating> {
        return await this.ratingService.findOne(userId);
    }

    @Put(':userId')
    @UseGuards(AuthGuard)
    async update(
        @User('id') reviewId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body(new ValidationPipe({ transform: true })) ratingDto: CrateRatingDto,
    ): Promise<void> {
        await this.ratingService.update(reviewId, userId);
    }

    @Post(':userId')
    @UseGuards(AuthGuard)
    async create(
        @User('id') reviewId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body(new ValidationPipe({ transform: true })) ratingDto: CrateRatingDto,
    ): Promise<void> {
        await this.ratingService.create(reviewId, userId);
    }
}
