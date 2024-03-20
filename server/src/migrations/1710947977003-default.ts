import { MigrationInterface, QueryRunner } from "typeorm";

export class default1710947977003 implements MigrationInterface {
    name = 'default1710947977003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`formulario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`conteudo\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`noticias\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`conteudo\` varchar(255) NOT NULL, \`dataPublicacao\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`TribunaToNoticia\` (\`id\` int NOT NULL AUTO_INCREMENT, \`noticiaId\` int NULL, \`tribunaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tribuna\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ClienteToTribuna\` (\`id\` int NOT NULL AUTO_INCREMENT, \`clienteId\` int NULL, \`tribunaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`sexo\` varchar(255) NOT NULL, \`telefone\` varchar(255) NOT NULL, \`bairro\` varchar(255) NOT NULL, \`endereco\` varchar(255) NOT NULL, \`cidade\` varchar(255) NOT NULL, \`cep\` varchar(255) NOT NULL, \`redes_sociais\` varchar(255) NOT NULL, \`password\` varchar(200) NOT NULL, \`profile\` varchar(255) NOT NULL, \`formId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ClienteToCandidato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`clienteId\` int NULL, \`candidatoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`jornal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`conteudo\` varchar(255) NOT NULL, \`dataPublicacao\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`CandidatoToJornal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`candidatoId\` int NULL, \`jornalId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`partido\` varchar(255) NOT NULL, \`cargoPretendido\` varchar(255) NOT NULL, \`biografia\` varchar(255) NOT NULL, \`noticiaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`TribunaToNoticia\` ADD CONSTRAINT \`FK_8376019142ddd0472fd443a7bc9\` FOREIGN KEY (\`noticiaId\`) REFERENCES \`noticias\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`TribunaToNoticia\` ADD CONSTRAINT \`FK_d6f79de6d8670f5bde744f2f3bd\` FOREIGN KEY (\`tribunaId\`) REFERENCES \`tribuna\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ClienteToTribuna\` ADD CONSTRAINT \`FK_763c4d83c8ec71dc79b7bbda839\` FOREIGN KEY (\`clienteId\`) REFERENCES \`cliente\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ClienteToTribuna\` ADD CONSTRAINT \`FK_489d3d808b8d8381081b379da43\` FOREIGN KEY (\`tribunaId\`) REFERENCES \`tribuna\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_6aa21c8a168070d6f8ffb0142aa\` FOREIGN KEY (\`formId\`) REFERENCES \`formulario\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ClienteToCandidato\` ADD CONSTRAINT \`FK_bc1c7285056cea75aa6cd72ad7e\` FOREIGN KEY (\`clienteId\`) REFERENCES \`cliente\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ClienteToCandidato\` ADD CONSTRAINT \`FK_febbf8be38f92a90382e82627fa\` FOREIGN KEY (\`candidatoId\`) REFERENCES \`candidato\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`CandidatoToJornal\` ADD CONSTRAINT \`FK_3453a587760dac85f246cdfa4b0\` FOREIGN KEY (\`candidatoId\`) REFERENCES \`candidato\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`CandidatoToJornal\` ADD CONSTRAINT \`FK_ae883c6cb3386f66a50a51e6af3\` FOREIGN KEY (\`jornalId\`) REFERENCES \`jornal\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidato\` ADD CONSTRAINT \`FK_584556e67fcf86a248a07de34ac\` FOREIGN KEY (\`noticiaId\`) REFERENCES \`noticias\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidato\` DROP FOREIGN KEY \`FK_584556e67fcf86a248a07de34ac\``);
        await queryRunner.query(`ALTER TABLE \`CandidatoToJornal\` DROP FOREIGN KEY \`FK_ae883c6cb3386f66a50a51e6af3\``);
        await queryRunner.query(`ALTER TABLE \`CandidatoToJornal\` DROP FOREIGN KEY \`FK_3453a587760dac85f246cdfa4b0\``);
        await queryRunner.query(`ALTER TABLE \`ClienteToCandidato\` DROP FOREIGN KEY \`FK_febbf8be38f92a90382e82627fa\``);
        await queryRunner.query(`ALTER TABLE \`ClienteToCandidato\` DROP FOREIGN KEY \`FK_bc1c7285056cea75aa6cd72ad7e\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_6aa21c8a168070d6f8ffb0142aa\``);
        await queryRunner.query(`ALTER TABLE \`ClienteToTribuna\` DROP FOREIGN KEY \`FK_489d3d808b8d8381081b379da43\``);
        await queryRunner.query(`ALTER TABLE \`ClienteToTribuna\` DROP FOREIGN KEY \`FK_763c4d83c8ec71dc79b7bbda839\``);
        await queryRunner.query(`ALTER TABLE \`TribunaToNoticia\` DROP FOREIGN KEY \`FK_d6f79de6d8670f5bde744f2f3bd\``);
        await queryRunner.query(`ALTER TABLE \`TribunaToNoticia\` DROP FOREIGN KEY \`FK_8376019142ddd0472fd443a7bc9\``);
        await queryRunner.query(`DROP TABLE \`candidato\``);
        await queryRunner.query(`DROP TABLE \`CandidatoToJornal\``);
        await queryRunner.query(`DROP TABLE \`jornal\``);
        await queryRunner.query(`DROP TABLE \`ClienteToCandidato\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
        await queryRunner.query(`DROP TABLE \`ClienteToTribuna\``);
        await queryRunner.query(`DROP TABLE \`tribuna\``);
        await queryRunner.query(`DROP TABLE \`TribunaToNoticia\``);
        await queryRunner.query(`DROP TABLE \`noticias\``);
        await queryRunner.query(`DROP TABLE \`formulario\``);
    }

}
