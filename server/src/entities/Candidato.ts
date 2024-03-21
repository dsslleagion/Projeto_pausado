// candidato.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ClienteToCandidato } from './ClienteToCandidato';
import { CandidatoToJornal } from './CandidatoToJornal';
import { Noticia } from './Noticia';

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
  biografia: string;

  @Column({ nullable: false })
  imagem: string;

  @OneToMany(() => ClienteToCandidato, (cliToCan) => cliToCan.candidato)
  cliToCan: ClienteToCandidato[];

  @OneToMany(() => CandidatoToJornal, (canToJor) => canToJor.candidato)
  canToJor: CandidatoToJornal[];

  @ManyToOne(() => Noticia, (noti) => noti.candidato, { onDelete: 'CASCADE', eager: true })
  noticia: Noticia;
  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
