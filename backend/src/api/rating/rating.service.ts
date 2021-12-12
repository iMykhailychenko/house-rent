import { Injectable } from '@nestjs/common';

import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Injectable()
export class RatingService {
    async findOne(profileId: number): Promise<string> {
        return `This action returns a #${profileId} rating`;
    }

    async create(createRatingDto: CreateRatingDto): Promise<void> {
        console.log(createRatingDto);
    }

    async update(profileId: number, updateRatingDto: UpdateRatingDto): Promise<void> {
        console.log(profileId, updateRatingDto);
    }
}
