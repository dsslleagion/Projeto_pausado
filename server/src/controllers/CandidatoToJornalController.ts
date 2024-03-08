// tribuna.controller.ts

import { Request, Response } from 'express';
import { CandidatoToJornal } from '../entities/CandidatoToJornal';
import AppDataSource from "../data-source";

class CandidatoToJornalController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(CandidatoToJornal)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar os candidato!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(CandidatoToJornal)
      const one = await rep.findOneBy({id: id})
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Candidato não encontrada!', err: err})
    }
  }

  public async getOneIdCandidato(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(CandidatoToJornal)
      const one = await rep
      .createQueryBuilder('CandidatoToJornal')
      .innerJoinAndSelect('CandidatoToJornal.jornal', 'jornal')
      .where('CandidatoToJornal.candidato = :candidatoId', { candidatoId: id })
      .getMany();
      return res.status(200).json(one)
    }catch(err){
      console.log(err);
      
      return res.status(404).json({erro: 'Candidato não encontrada!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
      const { jornal, candidato } = req.body
      if(jornal == undefined || jornal == null || candidato == undefined || candidato == null){
        return res.status(400).json({erro: 'Dados inseridos errados!'})
      }
      const rep = AppDataSource.getRepository(CandidatoToJornal)
      const liga = new CandidatoToJornal()
      liga.jornal = jornal
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
      const { jornal, candidato } = req.body
      const rep = AppDataSource.getRepository(CandidatoToJornal)
      const one = await rep.findOneBy({id: id})
      one.jornal = jornal
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
      const rep = AppDataSource.getRepository(CandidatoToJornal)
      const one = await rep.findOneBy({id: id})
      const remove = await rep.remove(one)
      return res.status(200).json(remove)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar candidato!', err: err})
    }
  }

  // Métodos restantes semelhantes aos do controller de Candidato...
}

export default new CandidatoToJornalController();
