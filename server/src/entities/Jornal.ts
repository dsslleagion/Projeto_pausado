// jornal.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CandidatoToJornal } from './CandidatoToJornal';

@Entity()
export class Jornal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  titulo: string;

  @Column({ nullable: false })
  conteudo: string;

  @Column({ nullable: false, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataPublicacao: Date;

  @OneToMany(() => CandidatoToJornal, (canToJor) => canToJor.jornal)
  canToJor: CandidatoToJornal[];

  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
