import { MigrationInterface, QueryRunner } from "typeorm";

export class default1710934568354 implements MigrationInterface {
    name = 'default1710934568354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidato\` DROP COLUMN \`cargo\``);
        await queryRunner.query(`ALTER TABLE \`tribuna\` ADD \`descricao\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidato\` ADD \`cargoPretendido\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidato\` ADD \`biografia\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidato\` DROP COLUMN \`biografia\``);
        await queryRunner.query(`ALTER TABLE \`candidato\` DROP COLUMN \`cargoPretendido\``);
        await queryRunner.query(`ALTER TABLE \`tribuna\` DROP COLUMN \`descricao\``);
        await queryRunner.query(`ALTER TABLE \`candidato\` ADD \`cargo\` varchar(255) NOT NULL`);
    }

}
