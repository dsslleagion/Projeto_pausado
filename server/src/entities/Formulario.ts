import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Cliente } from './Cliente';
import { Tribuna } from './Tribuna';

@Entity()
export class Formulario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagem: string;

  @Column({ nullable: false })
  titulo: string;

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


  @ManyToOne(() => Cliente, (cli) => cli.form, { onDelete: 'CASCADE', eager: true })
  cliente: Cliente;

  @ManyToOne(() => Tribuna, (tri) => tri.form, { onDelete: 'CASCADE', eager: true })
  tribuna: Tribuna;
}

/*
5. *Tabela Formulário*:
   - imagem //
   - titulo //
   - cidade //
   - data //
   - estado //
   - bairro //
   - conteudo //
   - tribuna_id (Chave Estrangeira referenciando Tabela Tribunas) //
   - usuario_id (Chave Estrangeira referenciando Tabela Usuários) //

*/