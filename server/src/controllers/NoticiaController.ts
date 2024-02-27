import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Cliente } from "../entities/Cliente";
import { authAdmin, generateToken } from "../middlewares";
import { loggerDelete, loggerUpdate } from "../config/logger";
import cliente from "../routes/cliente";
import { info, error, warm } from "../postMongo";
import { Noticia } from "../entities/Noticia";

class NoticiaController {
    public async index(req: Request, res: Response) {
        try {
            const noticiaRepository = AppDataSource.getRepository(Noticia);
            const noticias = await noticiaRepository.find();
            res.json(noticias);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar as notícias.' });
        }
    }

    public async show(req: Request, res: Response) {
        try {
            const noticiaRepository = AppDataSource.getRepository(Noticia);
            const noticiaId: number = parseInt(req.params.id); // Garantindo que o id seja um número
            const noticia = await noticiaRepository.findOne({ where: { id: noticiaId } });
            if (!noticia) {
                return res.status(404).json({ message: 'Notícia não encontrada.' });
            }
            res.json(noticia);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar a notícia.' });
        }
    }

    public async store(req: Request, res: Response) {
        const infoLog =  await info()
    const warmLog = await warm()
    try{
      const createNoticia = req.body
      const noticiaRepository = AppDataSource.getRepository(Noticia)
      const insertNoticia = new Noticia();
      insertNoticia.titulo = createNoticia.titulo
      insertNoticia.conteudo = createNoticia.conteudo
      insertNoticia.dataPublicacao = createNoticia.dataPublicacao
      
  
  
      const allNoticia = await  noticiaRepository.save(insertNoticia)
      infoLog.insertOne({
        date: new Date(),
        message: "Noticias cadastradas com sucesso",
        id: allNoticia.id
      })
      return res.json( allNoticia)
    }catch(err){
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao cadastrar Noticia: ' + err
      })
      return res.status(400).json({error: err})
    }
  }

    public async update(req: Request, res: Response) {
        try {
            const noticiaRepository = AppDataSource.getRepository(Noticia);
            const noticiaId: number = parseInt(req.params.id); // Garantindo que o id seja um número
            const noticia = await noticiaRepository.findOne({ where: { id: noticiaId } });
            if (!noticia) {
                return res.status(404).json({ message: 'Notícia não encontrada.' });
            }
            noticiaRepository.merge(noticia, req.body);
            const result = await noticiaRepository.save(noticia);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar a notícia.' });
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const noticiaRepository = AppDataSource.getRepository(Noticia);
            const noticiaId: number = parseInt(req.params.id); // Garantindo que o id seja um número
            const noticia = await noticiaRepository.findOne({ where: { id: noticiaId } });
            if (!noticia) {
                return res.status(404).json({ message: 'Notícia não encontrada.' });
            }
            const result = await noticiaRepository.remove(noticia);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir a notícia.' });
        }
    }

}

export default new NoticiaController();