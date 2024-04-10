import { Request, Response } from 'express';
import AppDataSource from "../data-source";
import { Sobre } from '../entities/Sobre';

class SobreController {

  public async getAll(req: Request, res: Response): Promise<Response>{
    try{
      const rep = AppDataSource.getRepository(Sobre)
      const all = await rep.find()
      return res.status(200).json(all)
    }catch(err){
      return res.status(404).json({erro: 'Erro ao buscar os sobre!', err: err})
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Sobre)
      const one = await rep.findOneBy({id:id})
      return res.status(200).json(one)
    }catch(err){
      return res.status(404).json({erro: 'Sobre não encontrado!', err: err})
    }
  }

  public async post(req: Request, res: Response): Promise<Response>{
    try{
        const { historia_empresa, conteudo, foto_administracao, projetos } = req.body
        const rep = AppDataSource.getRepository(Sobre)
        const sobre = new Sobre()
        sobre.historia_empresa = historia_empresa
        sobre.conteudo = conteudo
        sobre.foto_administracao = foto_administracao
        sobre.projetos = projetos 

        const result = await rep.save(sobre)
        return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro: "Sobre não cadastrado!", err: err})
    }
  }

  public async put(req: Request, res: Response): Promise<Response> {
    try {
      const id:any = req.params.uuid
      const { historia_empresa, conteudo, foto_administracao, projetos } = req.body
      const rep = AppDataSource.getRepository(Sobre)
      const sobre = await rep.findOneBy({id:id})
      if (!sobre) {
        return res.status(404).json({ error: 'Sobre não encontrado' });
      }
      sobre.historia_empresa = historia_empresa
      sobre.conteudo = conteudo
      sobre.foto_administracao = foto_administracao
      sobre.projetos = projetos  
      const result = await rep.save(sobre)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar sobre', err: error });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response>{
    try{
      const id:any = req.params.uuid
      const rep = AppDataSource.getRepository(Sobre)
      const sobre = await rep.findOneBy({id:id})
      if (!sobre) {
        return res.status(404).json({ error: 'Sobre não encontrado' });
      }
      const result = await rep.remove(sobre)
      return res.status(200).json(result)
    }catch(err){
      return res.status(400).json({erro:'Erro ao deletar sobre!', err: err})
    }
  }
}

export default new SobreController();
