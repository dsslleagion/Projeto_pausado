import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Cliente } from "../entities/Cliente";
import { authAdmin, generateToken } from "../middlewares";
import { loggerDelete, loggerUpdate } from "../config/logger";
import cliente from "../routes/cliente";
import { info, error, warm } from "../postMongo";
import { ClienteToTribuna } from "../entities/ClienteToTribuna";
import { ClienteToCandidato } from "../entities/ClienteToCandidato";

class ClienteController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    // Verifica se foram fornecidos os parâmetros
    if (!email || !password || email.trim() === "" || password.trim() === "") {

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

        const rep = AppDataSource.getRepository(ClienteToTribuna)
        const one = await rep
          .createQueryBuilder('clienteToTribuna')
          .innerJoinAndSelect('clienteToTribuna.tribuna', 'tribuna')
          .where('clienteToTribuna.cliente = :clienteId', { clienteId: usuario.id })
          .getMany();
        // const one = await rep.findBy({cliente: usuario.id})
        // console.log(one.forEach((item) => console.log(item.tribuna)))
        const repCandi = AppDataSource.getRepository(ClienteToCandidato)
        const candidatos = await repCandi
          .createQueryBuilder('clienteToCandidato')
          .innerJoinAndSelect('clienteToCandidato.candidato', 'candidato')
          .where('clienteToCandidato.cliente = :clienteId', { clienteId: usuario.id })
          .getMany();

      if (usuario && usuario.id) {
        const isPasswordValid = await usuario.compare(password);

        if (isPasswordValid) {
          // Cria um token codificando o objeto {id, email, profile}
          const token = await generateToken({ id: usuario.id, email: usuario.email, profile: usuario.profile });

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
            tribunas: one,
            candidatos: candidatos,
            imagem: usuario.imagem,
            token
          });
        } else {
          return res.status(400).json({ error: "Dados de login não conferem" });
        }
      } else {
        return res.status(400).json({ error: "Usuário não localizado" });
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  public async putCliente(req: Request, res: Response): Promise<Response> {
    try {
      const createCliente = req.body;
      const idCliente: any = req.params.uuid;
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const findCliente = await clienteRepository.findOneBy({ id: idCliente });
      if (!findCliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
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
      findCliente.estado = createCliente.estado
      console.log(findCliente);
      
      if(createCliente.profile !== undefined){
        findCliente.profile = createCliente.profile
      }

      if(createCliente.imagem !== null || createCliente.imagem !== undefined){
        findCliente.imagem = createCliente.imagem
      }

      // Salve as alterações no cliente
      const updatedCliente = await clienteRepository.save(findCliente);
      return res.json(updatedCliente);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
  }


  public async putPassword(req: Request, res: Response): Promise<Response> {
    try{
      const { password } = req.body
      const email: any = req.params.email;
      const client: any = await AppDataSource.manager
        .getRepository(Cliente)
        .createQueryBuilder("cliente")
        .select()
        .addSelect('cliente.password')
        .where("cliente.email=:email", { email })
        .getOne();
      console.log();
      client.password = password

      const r = await AppDataSource.manager.save(Cliente, client)

      return res.json(r)
    }catch(err){
      return res.status(400).json({error: err})
    }
  }


  public async getHistoricCliente(req: Request, res: Response): Promise<Response> {
    try{
      const clienteRepository = AppDataSource.getRepository(Cliente)
      const allCliente = await clienteRepository.find()
      console.log(allCliente)

      return res.json(allCliente)
    }catch(err){
      return res.status(400).json({error: err})
    }
  }

  public async getCliente(req: Request, res: Response): Promise<Response> {
    try {
      const idCliente: any = req.params.uuid;
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const cliente = await clienteRepository.findOneBy({ id: idCliente });

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

    //  const { nome, email, sexo, telefone, endereco, bairro, cep , cidade, redes_sociais, profile } = cliente;

      // const clienteData = {
      //   id: idCliente,
      //   nome,
      //   email,
      //   sexo,
      //   telefone,
      //   endereco,
      //   bairro,
      //   cep,
      //   cidade,
      //   redes_sociais,

      //   profile
      // };
      return res.json(cliente);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
  }
  public async getAllCliente(req: Request, res: Response): Promise<Response> {

    try {
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const clientes = await clienteRepository.find();

      if (!clientes || clientes.length === 0) {
        return res.status(404).json({ error: 'Nenhum cliente encontrado' });
      }

      return res.json(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }
  public async postCliente(req: Request, res: Response): Promise<Response> {
    try{
      const createCliente = req.body
      const clienteRepository = AppDataSource.getRepository(Cliente)
      if (createCliente.nome === undefined || createCliente.email === undefined || createCliente.sexo === undefined || createCliente.telefone === undefined || createCliente.endereco === undefined ) {
        return res.status(405).json({erro: "Dados invalidos!"})
      }
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
      insertCliente.estado = createCliente.estado

      if(createCliente.imagem === null || createCliente.imagem === undefined){
        insertCliente.imagem = 'https://cvfggtwoyyhatnhuumla.supabase.co/storage/v1/object/public/usuarios/perfil-sem-foto.png'
      }else{
        insertCliente.imagem = createCliente.imagem
      }
  
  
      const allCliente = await clienteRepository.save(insertCliente)
      return res.json(allCliente)
    }catch(err){
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
    try{
      const userId: any = req.params.uuid
      const clienteRepository = AppDataSource.getRepository(Cliente)
      const findCliente = await clienteRepository.findOneBy({ id: userId })
      const allCliente = await clienteRepository.remove(findCliente)
      return res.json(allCliente)
    }catch(err){
      return res.status(400).json(err)
    }
  }

}
export default new ClienteController();