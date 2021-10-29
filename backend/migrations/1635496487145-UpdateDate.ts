import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDate1635496487145 implements MigrationInterface {
    name = 'UpdateDate1635496487145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "creationDate" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "creationDate" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "creationDate" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "chats" RENAME COLUMN "creationDate" TO "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats" RENAME COLUMN "createdAt" TO "creationDate"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME COLUMN "createdAt" TO "creationDate"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "createdAt" TO "creationDate"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "createdAt" TO "creationDate"`);
    }

}
