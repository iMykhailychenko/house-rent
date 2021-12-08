import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/users.entity';
import { NotificationsType } from '../notifications.interface';

@Entity('notifications')
export class NotificationsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'boolean', default: true })
    isNew: boolean;

    @Column({ type: 'int', default: null })
    recipientId: number;

    @Column({ type: 'int', default: null })
    chatId: number;

    @Column({ type: 'int', default: null })
    postId: number;

    @ManyToOne(() => UserEntity, user => user.notifications)
    user: UserEntity;

    @Column({ type: 'varchar' })
    type: NotificationsType;
}
