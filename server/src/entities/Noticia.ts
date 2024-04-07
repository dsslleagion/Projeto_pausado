import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { TribunaToNoticia } from "./TribunaToNoticia";
import { Candidato } from "./Candidato";

@Entity({ name: "noticias" })
export class Noticia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    titulo: string;

    @Column({ nullable: false })
    imagem: string;

    @Column({ nullable: false, type: 'longtext' })
    conteudo: string;

    @Column({ nullable: false })
    cidade: string;

    @Column({ nullable: false })
    estado: string;

    @Column({ nullable: false })
    bairro: string;

    @Column({ nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataPublicacao: Date;

    @OneToMany(() => TribunaToNoticia, (tritoNot) => tritoNot.noticia)
    triToNot: TribunaToNoticia[];


    @ManyToOne(() => Candidato, (can) => can.noticia, { onDelete: 'CASCADE', eager: true })
    candidato: Candidato;

    

    // Você pode adicionar mais campos, se necessário
}
