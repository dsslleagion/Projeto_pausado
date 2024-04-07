// tribuna.controller.ts

import { Request, Response } from 'express';
import { Tribuna } from '../entities/Tribuna';
import AppDataSource from "../data-source";
import { info, error, warm } from "../postMongo";

class TribunaController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(Tribuna)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar as tribunas!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Tribuna)
      const one = await rep.findOneBy({id: id})
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Tribuna não encontrada!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
      const { nome , descricao, link_grupo } = req.body
      const rep = AppDataSource.getRepository(Tribuna)
      const tribuna = new Tribuna()
      tribuna.nome = nome
      tribuna.descricao = descricao
      tribuna.link_grupo = link_grupo
      const one = await rep.save(tribuna)
      return res.status(200).json(one)
    }catch(err){
      return res.status(400).json({erro: "Tribuna não cadastrada!", err: err})
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {

    try {
      const id:any = req.params.uuid
      const { nome , descricao, link_grupo } = req.body
      const rep = AppDataSource.getRepository(Tribuna)
      const one = await rep.findOneBy({id: id})
      one.nome = nome
      one.descricao = descricao
      one.link_grupo = link_grupo
      const save = await rep.save(one)
      return res.status(200).json(save)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar tribuna', err: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Tribuna)
      const one = await rep.findOneBy({id: id})
      const remove = await rep.remove(one)
      return res.status(200).json(remove)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar tribuna!', err: err})
    }
  }

  // Métodos restantes semelhantes aos do controller de Candidato...
}

export default new TribunaController();
