// tribuna.controller.ts

import { Request, Response } from 'express';
import { ClienteToCandidato } from '../entities/ClienteToCandidato';
import AppDataSource from "../data-source";

class ClienteToCandidatoController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(ClienteToCandidato)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar os candidato!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(ClienteToCandidato)
      const one = await rep.findOneBy({id: id})
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Candidato não encontrada!', err: err})
    }
  }

  public async getOneIdClient(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(ClienteToCandidato)
      const one = await rep
      .createQueryBuilder('clienteToCandidato')
      .innerJoinAndSelect('clienteToCandidato.candidato', 'candidato')
      .where('clienteToCandidato.cliente = :clienteId', { clienteId: id })
      .getMany();
      return res.status(200).json(one)
    }catch(err){
      console.log(err);
      
      return res.status(404).json({erro: 'Candidato não encontrada!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
      const { cliente, candidato } = req.body
      if(cliente == undefined || cliente == null || candidato == undefined || candidato == null){
        return res.status(400).json({erro: 'Dados inseridos errados!'})
      }
      const rep = AppDataSource.getRepository(ClienteToCandidato)
      const liga = new ClienteToCandidato()
      liga.cliente = cliente
      liga.candidato = candidato
      const one = await rep.save(liga)
      return res.status(200).json(one)
    }catch(err){
      return res.status(400).json({erro: "Candidato não cadastrada!", err: err})
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {

    try {
      const id:any = req.params.uuid
      const { cliente, candidato } = req.body
      const rep = AppDataSource.getRepository(ClienteToCandidato)
      const one = await rep.findOneBy({id: id})
      one.cliente = cliente
      one.candidato = candidato
      const save = await rep.save(one)
      return res.status(200).json(save)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar candidato', err: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(ClienteToCandidato)
      const one = await rep.findOneBy({id: id})
      const remove = await rep.remove(one)
      return res.status(200).json(remove)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar candidato!', err: err})
    }
  }

  // Métodos restantes semelhantes aos do controller de Candidato...
}

export default new ClienteToCandidatoController();
