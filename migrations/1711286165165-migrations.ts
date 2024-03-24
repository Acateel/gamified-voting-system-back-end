import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711286165165 implements MigrationInterface {
    name = 'Migrations1711286165165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."merit_characteristic_enum" AS ENUM(
                'purposefulness',
                'determination',
                'analysis',
                'planning',
                'activity'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "merit" (
                "id" SERIAL NOT NULL,
                "characteristic" "public"."merit_characteristic_enum" NOT NULL,
                "coefficient" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "employeeId" integer,
                CONSTRAINT "PK_4fe9ba3bb1ef648cefa639bbd81" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "option" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "count" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "votingId" integer,
                CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "voting" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "details" character varying NOT NULL,
                "purposefulness_cof" integer NOT NULL DEFAULT '1',
                "determination_cof" integer NOT NULL DEFAULT '1',
                "analysis_cof" integer NOT NULL DEFAULT '1',
                "planning_cof" integer NOT NULL DEFAULT '1',
                "activity_cof" integer NOT NULL DEFAULT '1',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_2dff1e5c53fa2cc610bea30476c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "vote" (
                "id" SERIAL NOT NULL,
                "weight" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "employeeId" integer,
                "votingId" integer,
                CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "employee" (
                "id" SERIAL NOT NULL,
                "fullname" character varying NOT NULL,
                "specialty" character varying NOT NULL,
                "purposefulness" integer NOT NULL,
                "determination" integer NOT NULL,
                "analysis" integer NOT NULL,
                "planning" integer NOT NULL,
                "activity" integer NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_4bff6b0b5fa18cb15cfa53cee55" UNIQUE ("fullname"),
                CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "merit"
            ADD CONSTRAINT "FK_9350fac762cfe329595561057b6" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "option"
            ADD CONSTRAINT "FK_f91dce68ad8afea9d7222371568" FOREIGN KEY ("votingId") REFERENCES "voting"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_ffe9e9ad6aff5f8e94097275130" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vote"
            ADD CONSTRAINT "FK_88ba3a68d52156f78a58a4c73d7" FOREIGN KEY ("votingId") REFERENCES "voting"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_88ba3a68d52156f78a58a4c73d7"
        `);
        await queryRunner.query(`
            ALTER TABLE "vote" DROP CONSTRAINT "FK_ffe9e9ad6aff5f8e94097275130"
        `);
        await queryRunner.query(`
            ALTER TABLE "option" DROP CONSTRAINT "FK_f91dce68ad8afea9d7222371568"
        `);
        await queryRunner.query(`
            ALTER TABLE "merit" DROP CONSTRAINT "FK_9350fac762cfe329595561057b6"
        `);
        await queryRunner.query(`
            DROP TABLE "employee"
        `);
        await queryRunner.query(`
            DROP TABLE "vote"
        `);
        await queryRunner.query(`
            DROP TABLE "voting"
        `);
        await queryRunner.query(`
            DROP TABLE "option"
        `);
        await queryRunner.query(`
            DROP TABLE "merit"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."merit_characteristic_enum"
        `);
    }

}
