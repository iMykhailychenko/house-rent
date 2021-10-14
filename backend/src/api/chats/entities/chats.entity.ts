import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/users.entity';

@Entity('chats')
export class ChatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[];
}
