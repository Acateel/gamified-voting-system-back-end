import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711799265940 implements MigrationInterface {
    name = 'Migrations1711799265940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "employeeId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_ab4a80281f1e8d524714e00f38f" UNIQUE ("employeeId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_ab4a80281f1e8d524714e00f38f" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_ab4a80281f1e8d524714e00f38f"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_ab4a80281f1e8d524714e00f38f"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "employeeId"
        `);
    }

}
