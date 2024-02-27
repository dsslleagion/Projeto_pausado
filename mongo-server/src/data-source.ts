import "reflect-metadata"

import { Users } from "./entity/Cliente"
import { ClienteEntity } from "./entity/Update"
import { DataSource } from "typeorm";
import 'dotenv/config';
import { info } from "./postMongo";

export const AppDataSource = new DataSource({
  type: "mongodb", 
 // url: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}.gyfwek9.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
  url: "mongodb+srv://fatec:CwNdaImFjuebsHKh@cluster0.gyfwek9.mongodb.net/seguranca?retryWrites=true&w=majority",
  synchronize: true, 
  logging: true, 
  entities: [Users], 
  subscribers: [],
  maxQueryExecutionTime: 2000,
  useUnifiedTopology: true
});


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!"); //sucesso na promessa
  })
  .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
  });
  
  async function qualquer  ()  {
    const logsCollection = await info();
      console.log('vasco da gama',logsCollection);
   
  }
  qualquer();
  
export default AppDataSource;