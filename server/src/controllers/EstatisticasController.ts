import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Cliente } from '../entities/Cliente';
import { Tribuna } from '../entities/Tribuna';
import { Candidato } from '../entities/Candidato';
import { ClienteToTribuna } from '../entities/ClienteToTribuna';
import { ClienteToCandidato } from '../entities/ClienteToCandidato';

class EstatisticasController {
  public async getInteresseTribunasPorCliente(req: Request, res: Response) {
    try {
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const clientes = await clienteRepository.find({ relations: ['cliToTri'] });

      const interesseTribunas = clientes.map(cliente => ({
        cliente: cliente.nome,
        interesse: cliente.cliToTri.length
      }));

      return res.json(interesseTribunas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar interesse nas tribunas por cliente' });
    }
  }

  public async getIntencaoVotoPorCliente(req: Request, res: Response) {
    try {
      const clienteRepository = AppDataSource.getRepository(Cliente);
      const clientes = await clienteRepository.find({ relations: ['cliToCan'] });

      const intencaoVoto = clientes.flatMap(cliente => cliente.cliToCan.map(assoc => ({
        candidato: assoc.candidato.nome,
        intencao: 1
      })));

      return res.json(intencaoVoto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar intenção de voto por cliente' });
    }
  }

  public async getInteresseClientesPorTribuna(req: Request, res: Response) {
    try {
      const tribunaRepository = AppDataSource.getRepository(Tribuna);
      const tribunas = await tribunaRepository.find({ relations: ['cliToTri'] });

      const interesseClientes = tribunas.map(tribuna => ({
        tribuna: tribuna.nome,
        interesse: tribuna.cliToTri.length
      }));

      return res.json(interesseClientes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar interesse de clientes por tribuna' });
    }
  }

  public async getIntencaoVotoPorCandidato(req: Request, res: Response) {
    try {
      const candidatoRepository = AppDataSource.getRepository(Candidato);
      const candidatos = await candidatoRepository.find({ relations: ['cliToCan'] });

      const intencaoVoto = candidatos.map(candidato => ({
        candidato: candidato.nome,
        intencao: candidato.cliToCan.length
      }));

      return res.json(intencaoVoto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar intenção de voto por candidato' });
    }
  }
}

export default new EstatisticasController();
