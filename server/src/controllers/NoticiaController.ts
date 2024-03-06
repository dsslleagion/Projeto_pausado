import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Cliente } from "../entities/Cliente";
import { authAdmin, generateToken } from "../middlewares";
import { loggerDelete, loggerUpdate } from "../config/logger";
import cliente from "../routes/cliente";
import { info, error, warm } from "../postMongo";
import { Noticia } from "../entities/Noticia";

class NoticiaController {
    public async getAll(req: Request, res: Response) {
        try {
            const noticiaRepository = AppDataSource.getRepository(Noticia);
            const noticias = await noticiaRepository.find();
            res.json(noticias);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar as notícias.' });
        }
    }

    public async getOne(req: Request, res: Response) {
        try {
            const id: any = req.params.uuid
            const rep = AppDataSource.getRepository(Noticia)
            const one = await rep.findOneBy({ id: id })
            return res.status(200).json(one)
        } catch (err) {
            return res.status(404).json({ erro: 'Jornal não encontrado!', err: err })
        }

    }

    public async store(req: Request, res: Response) {
        const infoLog = await info()
        const warmLog = await warm()
        try {
            const createNoticia = req.body
            const noticiaRepository = AppDataSource.getRepository(Noticia)
            const insertNoticia = new Noticia();
            insertNoticia.titulo = createNoticia.titulo
            insertNoticia.conteudo = createNoticia.conteudo
            insertNoticia.dataPublicacao = createNoticia.dataPublicacao



            const allNoticia = await noticiaRepository.save(insertNoticia)
            infoLog.insertOne({
                date: new Date(),
                message: "Noticias cadastradas com sucesso",
                id: allNoticia.id
            })
            return res.json(allNoticia)
        } catch (err) {
            warmLog.insertOne({
                date: new Date(),
                message: 'Erro ao cadastrar Noticia: ' + err
            })
            return res.status(400).json({ error: err })
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: any = req.params.uuid
            const { titulo, conteudo, dataPublicacao } = req.body
            const rep = AppDataSource.getRepository(Noticia)
            const noticia = await rep.findOneBy({ id: id })
            if (!noticia) {
                return res.status(404).json({ error: 'Jornal não encontrado' });
            }
            noticia.titulo = titulo
            noticia.conteudo = conteudo
            noticia.dataPublicacao = dataPublicacao
            const result = await rep.save(noticia)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar jornal', err: error });
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const id: any = req.params.uuid
            const rep = AppDataSource.getRepository(Noticia)
            const noticia = await rep.findOneBy({ id: id })
            if (!noticia) {
                return res.status(404).json({ error: 'Jornal não encontrado' });
            }
            const result = await rep.remove(noticia)
            return res.status(200).json(result)
        } catch (err) {
            return res.status(400).json({ erro: 'Erro ao deletar jornal!', err: err })
        }
    }

}

export default new NoticiaController();