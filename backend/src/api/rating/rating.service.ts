import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatEntity } from '../chats/entities/chats.entity';
import { MessageEntity } from '../chats/entities/messages.entity';

import { CrateRatingDto } from './dto/crate-rating.dto';
import { RatingEntity } from './entities/rating.entity';
import { MESSAGES_LIMIT_FOR_RATE } from './rating.constant';
import { UserRating } from './rating.interface';
import { parseNumber } from './rating.util';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(ChatEntity) private readonly chatRepository: Repository<ChatEntity>,
        @InjectRepository(RatingEntity) private readonly ratingRepository: Repository<RatingEntity>,
        @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
    ) {}

    async findOne(userId: number): Promise<UserRating> {
        const data = await this.ratingRepository
            .createQueryBuilder('ratings')
            .select('COUNT(*) as total')
            .addSelect('AVG(ratings.value) as avg')
            .where('ratings.userId = :userId', { userId })
            .execute();

        return { total: parseNumber(data?.[0]?.total), avg: parseNumber(data?.[0]?.avg) };
    }

    async create(reviewerId: number, userId: number, ratingDto: CrateRatingDto): Promise<void> {
        const isAllowedToRate = await this.canRate(reviewerId, userId);
        if (!isAllowedToRate) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        const isAlreadyRated = await this.isRated(reviewerId, userId);
        if (isAlreadyRated) {
            throw new HttpException('Already rated', HttpStatus.BAD_REQUEST);
        }

        const rating = new RatingEntity();
        rating.userId = userId;
        rating.reviewerId = reviewerId;
        rating.value = ratingDto.value;

        await this.ratingRepository.save(rating);
    }

    async update(reviewerId: number, userId: number, ratingDto: CrateRatingDto): Promise<void> {
        const rating = await this.ratingRepository.findOne({ where: { userId, reviewerId } });

        if (!rating) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        rating.value = ratingDto.value;
        await this.ratingRepository.save(rating);
    }

    async canRate(reviewerId: number, userId: number): Promise<boolean> {
        const chat = await this.chatRepository
            .createQueryBuilder('chats')
            .where('(:userId = ANY(chats.users)) AND (:reviewerId = ANY(chats.users))', {
                userId,
                reviewerId,
            })
            .orderBy('chats.createdAt', 'DESC')
            .getOne();

        if (!chat) return false;

        const messagesOne = await this.messageRepository.find({
            where: { chat: { id: chat.id }, author: chat.users[0] },
            take: MESSAGES_LIMIT_FOR_RATE,
        });

        if (messagesOne.length < MESSAGES_LIMIT_FOR_RATE) return false;

        const messagesTwo = await this.messageRepository.find({
            where: { chat: { id: chat.id }, author: chat.users[1] },
            take: MESSAGES_LIMIT_FOR_RATE,
        });

        return messagesTwo.length >= MESSAGES_LIMIT_FOR_RATE;
    }

    async isRated(reviewerId: number, userId: number): Promise<boolean> {
        return !!(await this.ratingRepository
            .createQueryBuilder('ratings')
            .where('ratings.userId = :userId', { userId })
            .andWhere('ratings.reviewerId = :reviewerId', { reviewerId })
            .getOne());
    }
}
