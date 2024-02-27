import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";

import * as bcrypt from "bcrypt";

@Entity({ name: "cliente" })
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    sexo: string;

    @Column({ nullable: false })
    telefone: string;

    @Column({ nullable: false })
    bairro: string

    @Column({ nullable: false })
    endereco: string

    @Column({ nullable: false })
    cidade: string

    @Column({ nullable: false })
    cep: string

    @Column({ nullable: false })
    redes_sociais: string

    @Column({ nullable: false, select: false, length: 200 })
    password: string

    @Column()
    profile: string;


    @BeforeInsert() //a função hashPassword é disparada antes do insert e update
    @BeforeUpdate()
    hashPassword(): void {
        if (this.password) {
            // a senha é codificada usando o algoritmo do pacote bcrypt
            this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        }
    }

    compare(input: string): Promise<boolean> {
        // a senha fornecida em input é comparada com a senha do registro armazenado no SGBD
        return bcrypt.compare(input, this.password);
    }

}
