import {MigrationInterface, QueryRunner} from "typeorm";

export class init1634350968378 implements MigrationInterface {
    name = 'init1634350968378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT '{"IDLE":"idle","DRAFT":"draft","ACTIVE":"active","ARCHIVE":"archive"}', "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-16T02:22:50.430Z"', "views" integer NOT NULL DEFAULT '0', "title" character varying NOT NULL, "description" character varying NOT NULL, "residentsAmount" integer NOT NULL, "children" character varying, "pets" character varying, "image" character varying, "generalFilters" text array, "roomFilters" text array, "houseTypeFilters" text array, "priceFilters" text array, "cityFilters" character varying, "districtFilters" text array, "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "postId" integer, "userId" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-16T02:22:50.430Z"', "lastActivity" TIMESTAMP NOT NULL DEFAULT '"2021-10-16T02:22:50.430Z"', "avatar" character varying, "firstName" character varying(50) NOT NULL, "lastName" character varying(100) NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "role" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-16T02:22:50.431Z"', "text" character varying(500) NOT NULL, "isNew" boolean NOT NULL DEFAULT true, "uploads" text array NOT NULL DEFAULT '{}', "authorId" integer, "chatId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-16T02:22:50.431Z"', "users" integer array NOT NULL DEFAULT '{}', CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_61d6124af6c5306a062410af38b" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_36bc604c820bb9adc4c75cd4115"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_819e6bb0ee78baf73c398dc707f"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_61d6124af6c5306a062410af38b"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
