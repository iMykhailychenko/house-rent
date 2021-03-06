import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/users.entity';

import { ChatEntity } from './chats.entity';

@Entity('messages')
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: null, nullable: true })
    updatedAt: Date;

    @Column({ type: 'varchar', length: 1500 })
    text: string;

    @Column({ type: 'boolean', default: true })
    isNew: boolean;

    @Column('text', { array: true, default: [] })
    uploads: string[];

    @ManyToOne(() => UserEntity, user => user.messages)
    author: UserEntity;

    @ManyToOne(() => ChatEntity, chat => chat.messages)
    chat: ChatEntity;
}
