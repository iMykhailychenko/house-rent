import { Controller, Get, Put, Param, Post, ParseIntPipe, UseGuards, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guards';

import { User } from '../../shared/decorators/users.decorator';

import { CrateRatingDto } from './dto/crate-rating.dto';
import { ICanRate, UserRating } from './rating.interface';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Get(':userId')
    async findOne(@Param('userId', ParseIntPipe) userId: number): Promise<UserRating> {
        return await this.ratingService.findOne(userId);
    }

    @Get(':userId/can-rate')
    @UseGuards(AuthGuard)
    async canRate(@User('id') reviewerId: number, @Param('userId', ParseIntPipe) userId: number): Promise<ICanRate> {
        const canRate = await this.ratingService.canRate(reviewerId, userId);
        const isRated = await this.ratingService.isRated(reviewerId, userId);
        return { canRate, isRated };
    }

    @Put(':userId')
    @UseGuards(AuthGuard)
    async update(
        @User('id') reviewerId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body(new ValidationPipe({ transform: true })) ratingDto: CrateRatingDto,
    ): Promise<void> {
        await this.ratingService.update(reviewerId, userId);
    }

    @Post(':userId')
    @UseGuards(AuthGuard)
    async create(
        @User('id') reviewerId: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body(new ValidationPipe({ transform: true })) ratingDto: CrateRatingDto,
    ): Promise<void> {
        await this.ratingService.create(reviewerId, userId, ratingDto);
    }
}
