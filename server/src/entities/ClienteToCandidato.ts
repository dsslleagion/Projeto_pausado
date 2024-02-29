import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "./Cliente"
import { Candidato } from "./Candidato"



@Entity({ name: "ClienteToCandidato" })
export class ClienteToCandidato {
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // public userId: number

    @ManyToOne(() => Cliente, (cli) => cli.cliToCan, {onDelete: 'CASCADE', eager:true})
    cliente: Cliente

    @ManyToOne(() => Candidato, (can) => can.cliToCan, {onDelete: 'CASCADE', eager:true})
    candidato: Candidato
}