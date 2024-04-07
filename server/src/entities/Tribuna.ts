// tribuna.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClienteToTribuna } from './ClienteToTribuna';
import { TribunaToNoticia } from './TribunaToNoticia';
import { Candidato } from './Candidato';

@Entity()
export class Tribuna {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: false, type: 'longtext' })
  descricao: string;

  @Column({ nullable: false })
  link_grupo: string;
  
  @OneToMany(() => ClienteToTribuna, (cliToTri) => cliToTri.tribuna)
  cliToTri: ClienteToTribuna[];

  @OneToMany(() => TribunaToNoticia, (tritoNot) => tritoNot.noticia)
  triToNot: TribunaToNoticia[];

  @OneToMany(() => Candidato, (tri) => tri.tribuna)
  candidato: Candidato[];

  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}
