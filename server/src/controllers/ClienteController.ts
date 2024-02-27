import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Cliente } from "../entities/Cliente";
import { authAdmin, generateToken } from "../middlewares";
import { loggerDelete, loggerUpdate } from "../config/logger";
import cliente from "../routes/cliente";
import { info, error, warm } from "../postMongo";

class ClienteController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const infoLog =  await info()
    const warmLog = await warm()
    const errorLog =  await error()
    // Verifica se foram fornecidos os parâmetros
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      warmLog.insertOne({
        date: new Date(),
        message: "E-mail e senha necessários"
      })
      return res.json({ error: "E-mail e senha necessários" });
    }

    try {
      // Consulta o banco de dados para encontrar o usuário
      const usuario: any = await AppDataSource
        .getRepository(Cliente)
        .createQueryBuilder("cliente")
        .select()
        .addSelect('cliente.password')
        .where("cliente.email=:email", { email })
        .getOne();

      loggerUpdate.info("Sucesso");

      if (usuario && usuario.id) {
        const isPasswordValid = await usuario.compare(password);

        if (isPasswordValid) {
          // Cria um token codificando o objeto {id, email, profile}
          const token = await generateToken({ id: usuario.id, email: usuario.email, profile: usuario.profile });
          
          infoLog.insertOne({
            date: new Date(),
            message: "User login sucess",
            idUser: usuario.id
          })
          return res.json({
            id: usuario.id,
            nome: usuario.nome,
            userEmail: usuario.email,
            sexo: usuario.sexo,
            telefone: usuario.telefone,
            bairro: usuario.bairro,
            endereco: usuario.endereco,
            cidade: usuario.cidade,
            redes_sociais: usuario.redes_sociais,
            profile: usuario.profile,
            token
          });
        } else {
          warmLog.insertOne({
            date: new Date(),
            message: "Dados de login não conferem"
          })
          return res.status(400).json({ error: "Dados de login não conferem" });
        }
      } else {
        warmLog.insertOne({
          date: new Date(),
          message: "Usuário não localizado"
        })
        return res.status(400).json({ error: "Usuário não localizado" });
      }
    } catch (error) {
      errorLog.insertOne({
        date: new Date(),
        message: "Erro ao buscar usuário"
      })
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  public async putCliente(req: Request, res: Response): Promise<Response> {
    const infoLog =  await info()
    const warmLog = await warm()
    try {
      const createCliente = req.body;
      const idCliente: any = req.params.uuid;
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const findCliente = await clienteRepository.findOneBy({ id: idCliente });
      if (!findCliente) {
        warmLog.insertOne({
          date: new Date(),
          message: "Cliente não encontrado"
        })
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      loggerUpdate.info(`Cliente atualizado: ID ${idCliente}`);
      
      // Verifique cada campo e atualize o cliente
      // if (createCliente.nome !== undefined) {
      //   findCliente.nome = createCliente.nome;
      // }

      // if (createCliente.email !== undefined) {
      //   findCliente.email = createCliente.email;
      // }

      // if (createCliente.sexo !== undefined) {
      //   findCliente.sexo = createCliente.sexo;
      // }

      // if (createCliente.telefone !== undefined) {
      //   findCliente.telefone = createCliente.telefone;
      // }

      // if (createCliente.endereco !== undefined) {
      //   findCliente.endereco = createCliente.endereco;
      // }
      // if (createCliente.profile !== undefined) {
      //   findCliente.profile = createCliente.profile;
      // }

      if (createCliente.nome === undefined || createCliente.email === undefined || createCliente.sexo === undefined || createCliente.telefone === undefined || createCliente.endereco === undefined ) {
        warmLog.insertOne({
          date: new Date(),
          message: 'Erro ao atualizar cliente: ' + "Dados invalidos!"
        })
        return res.status(405).json({erro: "Dados invalidos!"})
      }
      findCliente.nome = createCliente.nome;
      findCliente.email = createCliente.email;
      findCliente.sexo = createCliente.sexo;
      findCliente.telefone = createCliente.telefone;
      findCliente.endereco = createCliente.endereco;
      findCliente.bairro = createCliente.bairro;
      findCliente.cidade = createCliente.cidade;
      findCliente.cep = createCliente.cep;
      findCliente.redes_sociais = createCliente.redes_sociais;
      console.log(findCliente);
      
      if(createCliente.profile !== undefined){
        findCliente.profile = createCliente.profile
      }

      // Salve as alterações no cliente
      const updatedCliente = await clienteRepository.save(findCliente);

      infoLog.insertOne({
        date: new Date(),
        message: "Cliente atualizado",
        idUser: updatedCliente.id
      })
      return res.json(updatedCliente);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao atualizar cliente: ' + error
      })

      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }


  public async putPassword(req: Request, res: Response): Promise<Response> {
    const infoLog =  await info()
    const warmLog = await warm()
    try{
      const { password } = req.body
      const id: any = req.params.uuid;
      const client: any = await AppDataSource.manager
        .getRepository(Cliente)
        .createQueryBuilder("cliente")
        .select()
        .addSelect('cliente.password')
        .where("cliente.id=:id", { id })
        .getOne();
      console.log();
      client.password = password

      const r = await AppDataSource.manager.save(Cliente, client)
      infoLog.insertOne({
        date: new Date(),
        message: "Senha atualizada com sucesso",
        idUser: id
      })
      return res.json(r)
    }catch(err){
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao atualizar senha: ' + err
      })
      return res.status(400).json({error: err})
    }
  }


  public async getHistoricCliente(req: Request, res: Response): Promise<Response> {
    const infoLog =  await info()
    const warmLog = await warm()
    try{
      const clienteRepository = AppDataSource.getRepository(Cliente)
      const allCliente = await clienteRepository.find()
      console.log(allCliente)
      infoLog.insertOne({
        date: new Date(),
        message: "Clientes pegos com sucesso"
      })
      return res.json(allCliente)
    }catch(err){
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao pegar usuarios: ' + err
      })
      return res.status(400).json({error: err})
    }
  }

  public async getCliente(req: Request, res: Response): Promise<Response> {
    const infoLog =  await info()
    const warmLog = await warm()
    try {
      const idCliente: any = req.params.uuid;
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const cliente = await clienteRepository.findOneBy({ id: idCliente });

      if (!cliente) {
        warmLog.insertOne({
          date: new Date(),
          message: 'Cliente não encontrado'
        })
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const { nome, email, sexo, telefone, endereco, bairro, cep , cidade, redes_sociais, profile } = cliente;

      const clienteData = {
        id: idCliente,
        nome,
        email,
        sexo,
        telefone,
        endereco,
        bairro,
        cep,
        cidade,
        redes_sociais,

        profile
      };
      infoLog.insertOne({
        date: new Date(),
        message: "Clientes pego com sucesso",
        id: idCliente
      })
      return res.json(clienteData);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao buscar cliente: ' + error
      })
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }
  public async getAllCliente(req: Request, res: Response): Promise<Response> {
    const infoLog = await info();
    const warmLog = await warm();

    try {
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const clientes = await clienteRepository.find();

      if (!clientes || clientes.length === 0) {
        warmLog.insertOne({
          date: new Date(),
          message: 'Nenhum cliente encontrado'
        });
        return res.status(404).json({ error: 'Nenhum cliente encontrado' });
      }

      const clientesData = clientes.map(cliente => ({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        sexo: cliente.sexo,
        telefone: cliente.telefone,
        endereco: cliente.endereco,
        bairro: cliente.bairro,
        cep: cliente.cep,
        cidade: cliente.cidade,
        redes_sociais: cliente.redes_sociais,
        profile: cliente.profile
      }));

      infoLog.insertOne({
        date: new Date(),
        message: 'Clientes pegos com sucesso'
      });

      return res.json(clientesData);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao buscar clientes: ' + error
      });
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }
  public async postCliente(req: Request, res: Response): Promise<Response> {
    const infoLog =  await info()
    const warmLog = await warm()
    try{
      const createCliente = req.body
      const clienteRepository = AppDataSource.getRepository(Cliente)
      const insertCliente = new Cliente();
      insertCliente.nome = createCliente.nome
      insertCliente.email = createCliente.email
      insertCliente.sexo = createCliente.sexo
      insertCliente.bairro = createCliente.bairro
      insertCliente.endereco = createCliente.endereco
      insertCliente.cidade = createCliente.cidade
      insertCliente.cep = createCliente.cep
      insertCliente.redes_sociais = createCliente.redes_sociais
      insertCliente.telefone = createCliente.telefone
      insertCliente.profile = createCliente.profile
      insertCliente.password = createCliente.password
  
  
      const allCliente = await clienteRepository.save(insertCliente)
      infoLog.insertOne({
        date: new Date(),
        message: "Clientes cadastrado com sucesso",
        id: allCliente.id
      })
      return res.json(allCliente)
    }catch(err){
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao cadastrar cliente: ' + err
      })
      return res.status(400).json({error: err})
    }
  }

  // public async putCliente(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const createCliente = req.body;
  //     const idCliente: any = req.params.uuid;
  //     const clienteRepository = AppDataSource.getRepository(Cliente);
  //     const findCliente = await clienteRepository.findOne(idCliente);

  //     if (!findCliente) {
  //       return res.status(404).json({ error: 'Cliente não encontrado' });
  //     }

  //     findCliente.nome = createCliente.nome;
  //     findCliente.sexo = createCliente.sexo;
  //     findCliente.telefone = createCliente.telefone;

  //     const updatedCliente = await clienteRepository.save(findCliente);

  //     return res.json(updatedCliente);
  //   } catch (error) {
  //     console.error('Erro ao atualizar cliente:', error);
  //     return res.status(500).json({ error: 'Erro ao atualizar cliente' });
  //   }
  // }



  public async deleteCliente(req: Request, res: Response): Promise<Response> {
    const infoLog =  await info()
    const warmLog = await warm()
    try{
      const userId: any = req.params.uuid
      const clienteRepository = AppDataSource.getRepository(Cliente)
      const findCliente = await clienteRepository.findOneBy({ id: userId })
      const allCliente = await clienteRepository.remove(findCliente)
      loggerDelete.info(`id: ${userId}`)
      infoLog.insertOne({
        date: new Date(),
        message: "Clientes deletado",
        id: userId
      })
      return res.json(allCliente)
    }catch(err){
      warmLog.insertOne({
        date: new Date(),
        message: 'Erro ao deletar cliente: ' + err
      })
      return res.status(400).json(err)
    }
  }

}
export default new ClienteController();