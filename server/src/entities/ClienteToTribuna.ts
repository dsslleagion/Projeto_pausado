import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Cliente } from "./Cliente"
import { Tribuna } from "./Tribuna"


@Entity({ name: "ClienteToTribuna" })
export class ClienteToTribuna {
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // public userId: number

    @ManyToOne(() => Cliente, (cli) => cli.cliToTri, {onDelete: 'CASCADE', eager:true})
    cliente: Cliente

    @ManyToOne(() => Tribuna, (tri) => tri.cliToTri, {onDelete: 'CASCADE', eager:true})
    tribuna: Tribuna
}