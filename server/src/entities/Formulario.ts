import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cliente } from './Cliente';

@Entity()
export class Formulario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagem: string;

  @Column({ nullable: false })
  conteudo: string;

  @OneToMany(() => Cliente, (cliente) => cliente.form)
  clinte: Cliente[];
}