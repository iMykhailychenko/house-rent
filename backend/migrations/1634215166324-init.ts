import {MigrationInterface, QueryRunner} from "typeorm";

export class init1634215166324 implements MigrationInterface {
    name = 'init1634215166324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT '{"IDLE":"idle","DRAFT":"draft","ACTIVE":"active","ARCHIVE":"archive"}', "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-14T12:39:28.849Z"', "views" integer NOT NULL DEFAULT '0', "title" character varying(300) NOT NULL, "description" character varying NOT NULL, "residentsAmount" integer NOT NULL, "children" character varying, "pets" character varying, "image" character varying, "generalFilters" text array, "roomFilters" text array, "houseTypeFilters" text array, "priceFilters" text array, "cityFilters" character varying, "districtFilters" text array, "userId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "postId" integer, "userId" integer, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT '"2021-10-14T12:39:28.850Z"', "lastActivity" TIMESTAMP NOT NULL DEFAULT '"2021-10-14T12:39:28.850Z"', "avatar" character varying, "firstName" character varying(50) NOT NULL, "lastName" character varying(100) NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "role" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats" ("id" SERIAL NOT NULL, CONSTRAINT "PK_0117647b3c4a4e5ff198aeb6206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chats_users_users" ("chatsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_8227865724042418a8c1ceada56" PRIMARY KEY ("chatsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d891de1ee6dc86bb9d6c9f044" ON "chats_users_users" ("chatsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_91c62ffedcb3d34053b698b56e" ON "chats_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_61d6124af6c5306a062410af38b" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite" ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chats_users_users" ADD CONSTRAINT "FK_3d891de1ee6dc86bb9d6c9f044e" FOREIGN KEY ("chatsId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "chats_users_users" ADD CONSTRAINT "FK_91c62ffedcb3d34053b698b56e0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chats_users_users" DROP CONSTRAINT "FK_91c62ffedcb3d34053b698b56e0"`);
        await queryRunner.query(`ALTER TABLE "chats_users_users" DROP CONSTRAINT "FK_3d891de1ee6dc86bb9d6c9f044e"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"`);
        await queryRunner.query(`ALTER TABLE "favorite" DROP CONSTRAINT "FK_61d6124af6c5306a062410af38b"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91c62ffedcb3d34053b698b56e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d891de1ee6dc86bb9d6c9f044"`);
        await queryRunner.query(`DROP TABLE "chats_users_users"`);
        await queryRunner.query(`DROP TABLE "chats"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favorite"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
