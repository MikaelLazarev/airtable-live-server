import {MigrationInterface, QueryRunner} from "typeorm";

export class newStructure1594035849787 implements MigrationInterface {
    name = 'newStructure1594035849787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "index" integer NOT NULL DEFAULT 1, "content" character varying NOT NULL DEFAULT '', "bundleId" character varying, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bundle" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "bundle" DROP COLUMN "block"`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_0f98861c22b41ff74b8dac2c3ad" FOREIGN KEY ("bundleId") REFERENCES "bundle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_0f98861c22b41ff74b8dac2c3ad"`);
        await queryRunner.query(`ALTER TABLE "bundle" ADD "block" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "bundle" ADD "index" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`DROP TABLE "block"`);
    }

}
