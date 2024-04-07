/* 

7. *Tabela Sobre Nós*:
   - id (Chave Primária)
   - historia_empresa
   - foto_administracao
   - descricao_administrador (campo que armazene MUITOS dados de texto)
   - Projetos(campo que armazene MUITOS dados de texto)
*/

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Sobre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'longtext' })
  historia_empresa: string;

  @Column({ nullable: false, type: 'longtext' })
  conteudo: string;

  @Column({ nullable: false, type: 'longtext' })
  projetos: string;

  @Column({ nullable: false })
  foto_administracao: string;

  // Outros campos e relacionamentos podem ser adicionados conforme necessário
}