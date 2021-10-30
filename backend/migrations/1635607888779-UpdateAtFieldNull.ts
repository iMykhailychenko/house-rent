import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAtFieldNull1635607888779 implements MigrationInterface {
    name = 'UpdateAtFieldNull1635607888779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "updatedAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" ALTER COLUMN "updatedAt" SET NOT NULL`);
    }

}
