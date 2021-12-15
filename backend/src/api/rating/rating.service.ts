import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from './entities/rating.entity';
import { UserRating } from './rating.interface';
import { parseNumber } from './rating.util';

@Injectable()
export class RatingService {
    constructor(@InjectRepository(RatingEntity) private readonly ratingRepository: Repository<RatingEntity>) {}

    async findOne(userId: number): Promise<UserRating> {
        const data = await this.ratingRepository
            .createQueryBuilder('ratings')
            .select('COUNT(*) as total')
            .addSelect('AVG(ratings.value) as avg')
            .where('ratings.userId = :userId', { userId })
            .execute();

        return { total: parseNumber(data?.[0]?.total), avg: parseNumber(data?.[0]?.avg) };
    }

    async create(reviewerId: number, userId: number): Promise<void> {
        const rating = new RatingEntity();
        rating.userId = userId;
        rating.reviewerId = reviewerId;
        rating.value = 5;

        await this.ratingRepository.create(rating);
    }

    async update(reviewerId: number, userId: number): Promise<void> {
        console.log(reviewerId, userId);
    }
}
