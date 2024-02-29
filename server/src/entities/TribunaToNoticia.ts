import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Tribuna } from "./Tribuna"
import { Noticia } from "./Noticia"


@Entity({ name: "TribunaToNoticia" })
export class TribunaToNoticia {
    @PrimaryGeneratedColumn()
    id: number

    // @Column()
    // public userId: number

    @ManyToOne(() => Noticia, (noti) => noti.triToNot, {onDelete: 'CASCADE', eager:true})
    noticia: Noticia

    @ManyToOne(() => Tribuna, (tri) => tri.triToNot, {onDelete: 'CASCADE', eager:true})
    tribuna: Tribuna
}