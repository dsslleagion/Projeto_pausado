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

  public async putTribuna(req: Request, res: Response): Promise<Response> {

    try {
     
    } catch (error) {
      console.error('Erro ao atualizar tribuna:', error);
  
      return res.status(500).json({ error: 'Erro ao atualizar tribuna' });
    }
  }

  // Métodos restantes semelhantes aos do controller de Candidato...
}

export default new TribunaController();
