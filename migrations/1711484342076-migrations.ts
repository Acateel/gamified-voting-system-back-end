import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711484342076 implements MigrationInterface {
    name = 'Migrations1711484342076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "option" DROP COLUMN "count"
        `);
        await queryRunner.query(`
            ALTER TABLE "option"
            ADD "count" real NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "vote" DROP COLUMN "weight"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD "weight" real NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP COLUMN "weight"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD "weight" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "option" DROP COLUMN "count"
        `);
        await queryRunner.query(`
            ALTER TABLE "option"
            ADD "count" integer NOT NULL DEFAULT '0'
        `);
    }

}
