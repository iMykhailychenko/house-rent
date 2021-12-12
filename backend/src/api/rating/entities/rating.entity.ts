import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rating')
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
