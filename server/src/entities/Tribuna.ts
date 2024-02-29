// tribuna.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClienteToTribuna } from './ClienteToTribuna';
import { TribunaToNoticia } from './TribunaToNoticia';

@Entity()
export class Tribuna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @OneToMany(() => ClienteToTribuna, (cliToTri) => cliToTri.tribuna)
  cliToTri: ClienteToTribuna[];

  @OneToMany(() => TribunaToNoticia, (tritoNot) => tritoNot.noticia)
  triToNot: TribunaToNoticia[];

  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
