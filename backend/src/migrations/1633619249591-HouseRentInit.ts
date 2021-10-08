import {MigrationInterface, QueryRunner} from "typeorm";

export class HouseRentInit1633619249591 implements MigrationInterface {
    name = 'HouseRentInit1633619249591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "postId" integer, "userId" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'idle', "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-07T15:07:30.113Z"', "views" integer NOT NULL DEFAULT '0', "title" character varying(300) NOT NULL, "description" character varying NOT NULL, "residentsAmount" integer NOT NULL, "children" character varying, "pets" character varying, "image" character varying, "generalFilters" text array, "roomFilters" text array, "houseTypeFilters" text array, "priceFilters" text array, "cityFilters" character varying, "districtFilters" text array, "userId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-07T15:07:30.114Z"', "lastActivity" TIMESTAMP NOT NULL DEFAULT '"2021-10-07T15:07:30.114Z"', "avatar" character varying, "firstName" character varying(50) NOT NULL, "lastName" character varying(100) NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "role" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "authorId" integer, "companionId" integer, "postId" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_61d6124af6c5306a062410af38b" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_ac7ca6f6fbe56f2a231369f2171" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_a112487a7aef2b7b126119d3bff" FOREIGN KEY ("companionId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_f296534bd5c3a8bb95643a5b51e" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_f296534bd5c3a8bb95643a5b51e"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_a112487a7aef2b7b126119d3bff"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_ac7ca6f6fbe56f2a231369f2171"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5c1cf55c308037b5aca1038a131"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_61d6124af6c5306a062410af38b"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
    }

}
