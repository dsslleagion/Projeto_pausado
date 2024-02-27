// tribuna.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tribuna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  tema: string;

  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
