// jornal.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
