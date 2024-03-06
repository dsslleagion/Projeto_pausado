import { Request, Response } from 'express';
import { Formulario } from '../entities/Formulario';
import AppDataSource from "../data-source";

class FormularioController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(Formulario)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar os formulários!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Formulario)
      const one = await rep.findOneBy({id:id})
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Formulário não encontrado!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
      const { conteudo } = req.body
      const rep = AppDataSource.getRepository(Formulario)
      const formulario = new Formulario()
      formulario.conteudo = conteudo
      const result = await rep.save(formulario)
      return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro: "Formulário não cadastrado!", err: err})
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      const id:any = req.params.uuid
      const { conteudo } = req.body
      const rep = AppDataSource.getRepository(Formulario)
      const formulario = await rep.findOneBy({id:id})
      if (!formulario) {
        return res.status(404).json({ error: 'Formulário não encontrado' });
      }
      formulario.conteudo = conteudo
      const result = await rep.save(formulario)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar formulário', err: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Formulario)
      const formulario = await rep.findOneBy({id:id})
      if (!formulario) {
        return res.status(404).json({ error: 'Formulário não encontrado' });
      }
      const result = await rep.remove(formulario)
      return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar formulário!', err: err})
    }
  }
}

export default new FormularioController();
