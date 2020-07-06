import {MigrationInterface, QueryRunner} from "typeorm";

export class bundleUpdate1594034741731 implements MigrationInterface {
    name = 'bundleUpdate1594034741731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bundle" DROP COLUMN "bundle"`);
        await queryRunner.query(`ALTER TABLE "bundle" ADD "index" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "bundle" ADD "block" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bundle" DROP COLUMN "block"`);
        await queryRunner.query(`ALTER TABLE "bundle" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "bundle" ADD "bundle" character varying NOT NULL`);
    }

}
