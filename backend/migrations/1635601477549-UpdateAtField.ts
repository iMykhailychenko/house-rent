import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAtField1635601477549 implements MigrationInterface {
    name = 'UpdateAtField1635601477549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "updatedAt"`);
    }

}
