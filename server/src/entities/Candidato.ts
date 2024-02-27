// candidato.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Candidato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false })
  partido: string;

  @Column({ nullable: false })
  cargo: string;

  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
