import {MigrationInterface, QueryRunner} from "typeorm";

export class init1634826793787 implements MigrationInterface {
    name = 'init1634826793787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "creationDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "creationDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastActivity" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "creationDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "chats" ALTER COLUMN "creationDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" ALTER COLUMN "creationDate" SET DEFAULT '2021-10-16 02:22:50.431'`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "creationDate" SET DEFAULT '2021-10-16 02:22:50.431'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastActivity" SET DEFAULT '2021-10-16 02:22:50.43'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "creationDate" SET DEFAULT '2021-10-16 02:22:50.43'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "creationDate" SET DEFAULT '2021-10-16 02:22:50.43'`);
    }

}
