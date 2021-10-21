import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/users.entity';

import { MessageEntity } from './messages.entity';

@Entity('chats')
export class ChatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date;

    @OneToMany(() => MessageEntity, message => message.chat)
    messages: MessageEntity[];

    @Column({ type: 'int', array: true, default: [] })
    users: number[];

    unreadMessages: number;
    lastMessage: MessageEntity;
    user: UserEntity;
}
