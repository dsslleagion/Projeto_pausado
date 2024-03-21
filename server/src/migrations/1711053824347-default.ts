import { MigrationInterface, QueryRunner } from "typeorm";

export class default1711053824347 implements MigrationInterface {
    name = 'default1711053824347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidato\` ADD \`imagem\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidato\` DROP COLUMN \`imagem\``);
    }

}
