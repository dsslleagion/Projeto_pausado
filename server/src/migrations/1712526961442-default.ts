import { MigrationInterface, QueryRunner } from "typeorm";

export class default1712526961442 implements MigrationInterface {
    name = 'default1712526961442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`noticias\` ADD \`imagem\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`noticias\` DROP COLUMN \`imagem\``);
    }

}
