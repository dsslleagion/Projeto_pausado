import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity({ name: "noticias" })
export class Noticia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    titulo: string;

    @Column({ nullable: false })
    conteudo: string;

    @Column({ nullable: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    dataPublicacao: Date;

    // Você pode adicionar mais campos, se necessário
}
