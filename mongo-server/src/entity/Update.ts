import { Entity, ObjectIdColumn, ObjectId, Column, BeforeUpdate, BeforeInsert, PrimaryGeneratedColumn } from "typeorm"
import * as bcrypt from "bcrypt";

@Entity()
export class  ClienteEntity {

    @ObjectIdColumn()
    id: ObjectId
    
    @Column()
    cli_id: string

    @Column()
    date: Date
    
    @Column({ nullable: false })
    nome: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    sexo: string;

    @Column({ nullable: false })
    telefone: string;

    @Column({ nullable: false })
    endereco: string

    @Column({ nullable: false })
    password: string

    @BeforeInsert() //a função hashPassword é disparada antes do insert e update
    @BeforeUpdate()
    hashPassword(): void {
        if (this.password) {
            // a senha é codificada usando o algoritmo do pacote bcrypt
            this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        }
    }

    

}