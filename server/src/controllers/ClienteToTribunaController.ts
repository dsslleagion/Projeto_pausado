// tribuna.controller.ts

import { Request, Response } from 'express';
import { ClienteToTribuna } from '../entities/ClienteToTribuna';
import AppDataSource from "../data-source";

class ClienteToTribunaController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(ClienteToTribuna)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar as tribunas!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(ClienteToTribuna)
      const one = await rep.findOneBy({id: id})
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Tribuna não encontrada!', err: err})
    }
  }

  public async getOneIdClient(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(ClienteToTribuna)
      const one = await rep
          .createQueryBuilder('clienteToTribuna')
          .innerJoinAndSelect('clienteToTribuna.tribuna', 'tribuna')
          .where('clienteToTribuna.cliente = :clienteId', { clienteId: id })
          .getMany();
      return res.status(200).json(one)
    }catch(err){
      console.log(err);
      
      return res.status(404).json({erro: 'Tribuna não encontrada!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
      const { cliente, tribuna } = req.body
      if(cliente == undefined || cliente == null || tribuna == undefined || tribuna == null){
        return res.status(400).json({erro: 'Dados inseridos errados!'})
      }
      const rep = AppDataSource.getRepository(ClienteToTribuna)
      const liga = new ClienteToTribuna()
      liga.cliente = cliente
      liga.tribuna = tribuna
      const one = await rep.save(liga)
      return res.status(200).json(one)
    }catch(err){
      return res.status(400).json({erro: "Tribuna não cadastrada!", err: err})
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {

    try {
      const id:any = req.params.uuid
      const { cliente, tribuna } = req.body
      const rep = AppDataSource.getRepository(ClienteToTribuna)
      const one = await rep.findOneBy({id: id})
      one.cliente = cliente
      one.tribuna = tribuna
      const save = await rep.save(one)
      return res.status(200).json(save)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar tribuna', err: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(ClienteToTribuna)
      const one = await rep.findOneBy({id: id})
      const remove = await rep.remove(one)
      return res.status(200).json(remove)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar tribuna!', err: err})
    }
  }

  // Métodos restantes semelhantes aos do controller de Candidato...
}

export default new ClienteToTribunaController();
