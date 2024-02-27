import { MigrationInterface, QueryRunner } from "typeorm";

export class default1708095088322 implements MigrationInterface {
    name = 'default1708095088322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`sexo\` varchar(255) NOT NULL, \`telefone\` varchar(255) NOT NULL, \`bairro\` varchar(255) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`cep\` varchar(255) NOT NULL, \`redes_sociais\` varchar(255) NOT NULL, \`password\` varchar(200) NOT NULL, \`profile\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`partido\` varchar(255) NOT NULL, \`cargo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jornal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`conteudo\` varchar(255) NOT NULL, \`dataPublicacao\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`noticias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`conteudo\` varchar(255) NOT NULL, \`dataPublicacao\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tribuna\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`tema\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tribuna\``);
        await queryRunner.query(`DROP TABLE \`noticias\``);
        await queryRunner.query(`DROP TABLE \`jornal\``);
        await queryRunner.query(`DROP TABLE \`candidato\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
    }

}
