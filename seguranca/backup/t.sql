-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: bancoteste.mysql.database.azure.com    Database: clientes
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `clientes`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `clientes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `clientes`;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sexo` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Diego Batista','teste@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$1FynP5leNs5kBHZGvmCcIO2UjKhKAQfkzWFMyTx00QTKWYzqqg30.','admin');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_termos`
--

DROP TABLE IF EXISTS `cliente_termos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_termos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dataAssociacao` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `dataAtualizacao` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `termosAceitos` json DEFAULT NULL,
  `cliente_id` int DEFAULT NULL,
  `termos_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c7cf7bc332da76e4bba430b20dc` (`cliente_id`),
  KEY `FK_42cdc21a36f2858c8ee44ea9516` (`termos_id`),
  CONSTRAINT `FK_42cdc21a36f2858c8ee44ea9516` FOREIGN KEY (`termos_id`) REFERENCES `termos` (`id`),
  CONSTRAINT `FK_c7cf7bc332da76e4bba430b20dc` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_termos`
--

LOCK TABLES `cliente_termos` WRITE;
/*!40000 ALTER TABLE `cliente_termos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_termos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1701135684967,'default1701135684967'),(2,1701136375486,'default1701136375486');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `termos`
--

DROP TABLE IF EXISTS `termos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `termos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemTermos` json NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `termos`
--

LOCK TABLES `termos` WRITE;
/*!40000 ALTER TABLE `termos` DISABLE KEYS */;
INSERT INTO `termos` VALUES (1,'{\"Teste\": \"teste\"}','2023-11-28 02:03:41'),(2,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"Esclarece quais dados são coletados e como serão usados.\", \"TermosDeServico\": \"Especifica as regras e condições que os usuários concordam em seguir ao usar o site.\", \"PoliticaDePrivacidade\": \"Explica como as informações dos usuários serão coletadas, usadas e protegidas.\"}','2023-11-28 02:04:14'),(3,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"Esclarece quais dados são coletados e como serão usados.\", \"TermosDeServico\": \"Especifica as regras e condições que os usuários concordam em seguir ao usar o site.\", \"PoliticaDePrivacidade\": \"Explica como as informações dos usuários serão coletadas, usadas e protegidas.\"}','2023-11-27 23:59:38'),(4,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"Esclarece quais dados são coletados e como serão usados.\", \"TermosDeServico\": \"Especifica as regras e condições que os usuários concordam em seguir ao usar o site.\", \"PoliticaDePrivacidade\": \"Explica como as informações dos usuários serão coletadas, usadas e proteteste\"}','2023-11-28 00:28:56'),(5,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"\", \"TermosDeServico\": \"\", \"PoliticaDePrivacidade\": \"\"}','2023-11-28 00:31:44'),(6,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"\", \"TermosDeServico\": \"\", \"PoliticaDePrivacidade\": \"rwrwrrwrwrwrw\"}','2023-11-28 10:33:31'),(7,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"\", \"TermosDeServico\": \"\", \"PoliticaDePrivacidade\": \"rwrwrrwrwrwrw\"}','2023-11-28 11:45:55');
/*!40000 ALTER TABLE `termos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'clientes'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-28 14:39:54
