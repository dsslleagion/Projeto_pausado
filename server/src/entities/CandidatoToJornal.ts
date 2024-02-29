import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Candidato } from "./Candidato"
import { Jornal } from "./Jornal"



@Entity({ name: "CandidatoToJornal" })
export class CandidatoToJornal {
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // public userId: number

    @ManyToOne(() => Candidato, (can) => can.canToJor, {onDelete: 'CASCADE', eager:true})
    candidato: Candidato

    @ManyToOne(() => Jornal, (jor) => jor.canToJor, {onDelete: 'CASCADE', eager:true})
    jornal: Jornal
}