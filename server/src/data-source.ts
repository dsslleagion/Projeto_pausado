import { DataSource } from "typeorm";
import {info} from "./postMongo";


const AppDataSource = new DataSource({
  database: "clientes",
  type: "mysql", 
  host: "localhost", 
  port: 3306, 
  username: "root",
  password: "fatec",

  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  maxQueryExecutionTime: 2000,
});

//  const AppDataSource = new DataSource({
//    database: "clientes",
//    type: "mysql", 
//    host: "bancoteste.mysql.database.azure.com", 
//    port: 3306, 
//    username: "fatec",
//    password: "sjc123@w",
//   // connectTimeout: 30000,

//    synchronize: false,
//    logging: false,
//    entities: ["src/entities/*.ts"],
//    migrations: ["src/migrations/*.ts"],
//    subscribers: [],
//    maxQueryExecutionTime: 10000,
//  });

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado!"); //sucesso na promessa
  })
  .catch((e) => {
    console.error("Erro na inicialização do Data Source:", e);
  });

  // async function qualquer  ()  {
  //   const logsCollection = await info();
  //     console.log('vasco da gama',logsCollection);
   
  // }
  // qualquer();
  

export default AppDataSource;
