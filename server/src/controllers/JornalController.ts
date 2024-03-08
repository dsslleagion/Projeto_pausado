import { Request, Response } from 'express';
import { Jornal } from '../entities/Jornal';
import AppDataSource from "../data-source";

class JornalController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(Jornal)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar os jornais!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Jornal)
      const one = await rep.findOneBy({id:id})
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Jornal não encontrado!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
      const { titulo, conteudo, dataPublicacao } = req.body
      const rep = AppDataSource.getRepository(Jornal)
      const jornal = new Jornal()
      jornal.titulo = titulo
      jornal.conteudo = conteudo
      jornal.dataPublicacao = dataPublicacao
      const result = await rep.save(jornal)
      return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro: "Jornal não cadastrado!", err: err})
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      const id:any = req.params.uuid
      const { titulo, conteudo, dataPublicacao } = req.body
      const rep = AppDataSource.getRepository(Jornal)
      const jornal = await rep.findOneBy({id:id})
      if (!jornal) {
        return res.status(404).json({ error: 'Jornal não encontrado' });
      }
      jornal.titulo = titulo
      jornal.conteudo = conteudo
      jornal.dataPublicacao = dataPublicacao
      const result = await rep.save(jornal)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar jornal', err: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Jornal)
      const jornal = await rep.findOneBy({id:id})
      if (!jornal) {
        return res.status(404).json({ error: 'Jornal não encontrado' });
      }
      const result = await rep.remove(jornal)
      return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar jornal!', err: err})
    }
  }
}

export default new JornalController();
