import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, ManyToOne } from "typeorm";
import * as bcrypt from "bcrypt";
import { Formulario } from "./Formulario";
import { ClienteToTribuna } from "./ClienteToTribuna";
import { ClienteToCandidato } from "./ClienteToCandidato";

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
    estado: string

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
    profile: string

    @Column({ nullable: false })
    imagem: string


    @BeforeInsert() //a função hashPassword é disparada antes do insert e update
    @BeforeUpdate()
    hashPassword(): void {
        if (this.password && this.password !== this.getOriginalPassword()) {
            // A senha foi alterada, então criptografe-a novamente
            this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        }
    }

    compare(input: string): Promise<boolean> {
        // a senha fornecida em input é comparada com a senha do registro armazenado no SGBD
        return bcrypt.compare(input, this.password);
    }

    private getOriginalPassword(): string {
        // Recupera a senha original do banco de dados
        return this.constructor.prototype.password;
    }

    @ManyToOne(() => Formulario, (form) => form.clinte, { onDelete: 'CASCADE', eager: true })
    form: Formulario;

    @OneToMany(() => ClienteToTribuna, (cliToTri) => cliToTri.cliente)
    cliToTri: ClienteToTribuna[];

    @OneToMany(() => ClienteToCandidato, (cliToCan) => cliToCan.cliente)
    cliToCan: ClienteToCandidato[];
}
