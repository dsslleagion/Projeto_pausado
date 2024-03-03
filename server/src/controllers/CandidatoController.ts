import { Request, Response } from 'express';
import { Candidato } from '../entities/Candidato';
import AppDataSource from "../data-source";

class CandidatoController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(Candidato)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar os candidatos!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Candidato)
      const one = await rep.findOne(id)
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Candidato não encontrado!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
      const { nome, partido, cargo } = req.body
      const rep = AppDataSource.getRepository(Candidato)
      const candidato = new Candidato()
      candidato.nome = nome
      candidato.partido = partido
      candidato.cargo = cargo
      const result = await rep.save(candidato)
      return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro: "Candidato não cadastrado!", err: err})
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      const id:any = req.params.uuid
      const { nome, partido, cargo } = req.body
      const rep = AppDataSource.getRepository(Candidato)
      const candidato = await rep.findOne(id)
      if (!candidato) {
        return res.status(404).json({ error: 'Candidato não encontrado' });
      }
      candidato.nome = nome
      candidato.partido = partido
      candidato.cargo = cargo
      const result = await rep.save(candidato)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar candidato', err: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Candidato)
      const candidato = await rep.findOne(id)
      if (!candidato) {
        return res.status(404).json({ error: 'Candidato não encontrado' });
      }
      const result = await rep.remove(candidato)
      return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar candidato!', err: err})
    }
  }
}

export default new CandidatoController();
