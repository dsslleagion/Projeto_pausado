import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/Cliente";
import { info, error } from "../postMongo";

class ClienteController {
  public async getCli(req: Request, res: Response): Promise<Response> {
    try {
      const rep = AppDataSource.getRepository(Users);
      const all = await rep.find();

      // Registra com sucesso a recuperação de dados do cliente
      const infoLog = await info();
      infoLog.insertOne({
        date: new Date(),
        message: 'Dados do cliente recuperados com sucesso',
      });

      return res.json(all);
    } catch (err) {
      // Registra o erro ao recuperar os dados do cliente
      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: `Erro ao recuperar dados do cliente: ${err.message}`,
      });

      return res.status(500).json(err);
    }
  }

  public async postCli(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.body;
      const rep = AppDataSource.getRepository(Users);
      const insert = new Users();
      insert.cli_id = Number(id);
      insert.date = new Date();
      const save = await rep.save(insert);

      // Registra a inserção bem-sucedida do cliente
      const infoLog = await info();
      await infoLog.insertOne({
        date: new Date(),
        message: `Cliente inserido com ID ${id} com sucesso`,
      });

      return res.json(save);
    } catch (err) {
      // Registra o erro na inserção do cliente
      const errorLog = await error();
      await errorLog.insertOne({
        date: new Date(),
        message: `Erro ao inserir cliente: ${err.message}`,
      });

      return res.status(400).json(err);
    }
  }
}

export default new ClienteController();
