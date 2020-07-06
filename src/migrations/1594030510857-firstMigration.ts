import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1594030510857 implements MigrationInterface {
    name = 'firstMigration1594030510857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bundle" ("id" character varying NOT NULL, "bundle" character varying NOT NULL, CONSTRAINT "PK_637e3f87e837d6532109c198dea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL DEFAULT '', "name" character varying NOT NULL DEFAULT '', "given_name" character varying NOT NULL DEFAULT '', "family_name" character varying NOT NULL DEFAULT '', "role" character varying NOT NULL DEFAULT '', "avatar_url" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "bundle"`);
    }

}
