// candidato.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ClienteToCandidato } from './ClienteToCandidato';
import { CandidatoToJornal } from './CandidatoToJornal';
import { Noticia } from './Noticia';
import { Tribuna } from './Tribuna';

@Entity()
export class Candidato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  partido: string;

  @Column({ nullable: false })
  cargoPretendido: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  estado: string;

  @Column({ nullable: false })
  bairro: string;
  
  @Column({ nullable: false, type: 'longtext' })
  biografia: string;

  @Column({ nullable: false, type: 'longtext' })
  projetos: string;

  @Column({ nullable: false })
  imagem: string;

  @Column({ nullable: false })
  agenda_link: string;

  @OneToMany(() => ClienteToCandidato, (cliToCan) => cliToCan.candidato)
  cliToCan: ClienteToCandidato[];

  @OneToMany(() => CandidatoToJornal, (canToJor) => canToJor.candidato)
  canToJor: CandidatoToJornal[];

  @ManyToOne(() => Noticia, (noti) => noti.candidato, { onDelete: 'CASCADE', eager: true })
  noticia: Noticia;

  @ManyToOne(() => Tribuna, (tri) => tri.candidato, { onDelete: 'CASCADE', eager: true })
  tribuna: Tribuna;
  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
