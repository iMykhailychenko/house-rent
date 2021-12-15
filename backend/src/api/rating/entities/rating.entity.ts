import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ratings')
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'int' })
    reviewerId: number;

    @Column({ type: 'int' })
    value: number;

    total: number;
    avg: number;
}
