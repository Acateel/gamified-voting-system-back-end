import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711479693388 implements MigrationInterface {
    name = 'Migrations1711479693388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_88ba3a68d52156f78a58a4c73d7"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
                RENAME COLUMN "votingId" TO "optionId"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_4ae2eb8e398ff87416da92ea286" FOREIGN KEY ("optionId") REFERENCES "option"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_4ae2eb8e398ff87416da92ea286"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
                RENAME COLUMN "optionId" TO "votingId"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_88ba3a68d52156f78a58a4c73d7" FOREIGN KEY ("votingId") REFERENCES "voting"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
