import { Controller, Get, Body, Put, Param, Post, ParseIntPipe } from '@nestjs/common';

import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Get(':profileId')
    async findOne(@Param('profileId', ParseIntPipe) profileId: number): Promise<string> {
        return this.ratingService.findOne(+profileId);
    }

    @Put(':profileId')
    async update(@Param('profileId', ParseIntPipe) profileId: number, @Body() updateRatingDto: UpdateRatingDto): Promise<void> {
        await this.ratingService.update(profileId, updateRatingDto);
    }

    @Post(':profileId')
    async create(@Param('profileId', ParseIntPipe) profileId: number): Promise<void> {
        await this.ratingService.create(profileId);
    }
}
