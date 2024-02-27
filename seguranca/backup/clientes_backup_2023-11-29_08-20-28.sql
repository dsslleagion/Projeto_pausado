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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (9,'Mateus','mateus@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$UNhZZi7qSRwJMyHEg1E2t.S5v3G5kT6S1QxSVZdgQ6rlM7JaaUea.','user'),(10,'teste','teste@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$4uPla00q1nRclKb8y/AoV.wV8FibnRwxt8X4k8pSgd4ruVWUqkOOm','user'),(16,'Larissa','lari@gmail.com','feminino','12996354789','Rua da Fatec, 135, Pq da Fatec','$2b$10$IErIQ2kHKYPNqQASyoyJDu3gl4MvcoWczRgN2LtgXfds2hpssmNRq','user'),(18,'limonada','limao@gmail.com','masculino','1234567898','Av do Limoeiro, 187, Bairro do Pomar','$2b$10$6qveLC9EunLbKfzyaDVXTui3UgJdgeRY.nOG.1Y0hhayzCS6bY3vC','user'),(19,'salada','salada@gmail.com','feminino','12978562314','Avenida do Tomate, 123, Vila Alface','$2b$10$lIJjmywY6YRkdBtVRB12w.wTvUMg9OVHifEwrPPv.RtcN9.htEJaO','user'),(20,'aaaa','aaa@gmail.com','masculino','123456789','aaaaaaa, 123, aaaaaa','$2b$10$NOKPI4HKVP0TRjqWiMee.O/ZuFSR7ZEDn9Eibs6HIrKs/vugkIMsa','user'),(21,'mateus','mateushls01@gmail.com','masculino','12121','rua','$2b$10$45c1.DMM46ZDK0auvYBEcOj7AAZh8T9Mc/fvtADopuvnnywIVdLwK','user');
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
  `itemTermos` json DEFAULT NULL,
  `cliente_id` int DEFAULT NULL,
  `termos_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c7cf7bc332da76e4bba430b20dc` (`cliente_id`),
  KEY `FK_42cdc21a36f2858c8ee44ea9516` (`termos_id`),
  CONSTRAINT `FK_42cdc21a36f2858c8ee44ea9516` FOREIGN KEY (`termos_id`) REFERENCES `termos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_c7cf7bc332da76e4bba430b20dc` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_termos`
--

LOCK TABLES `cliente_termos` WRITE;
/*!40000 ALTER TABLE `cliente_termos` DISABLE KEYS */;
INSERT INTO `cliente_termos` VALUES (1,'2023-11-29 00:51:11.933000','2023-11-29 00:51:11.933000','{\"Cookies\": \"true\", \"ColetaDeDados\": \"true\", \"TermosDeServico\": \"false\"}',NULL,NULL),(7,'2023-11-29 01:07:33.659000','2023-11-29 01:07:33.659000','{\"Cookies\": \"true\", \"ColetaDeDados\": \"false\", \"TermosDeServico\": \"true\"}',9,19),(8,'2023-11-29 01:09:45.897000','2023-11-29 01:09:45.897000','{\"Cookies\": \"false\", \"ColetaDeDados\": \"true\", \"TermosDeServico\": \"true\"}',10,19),(15,'2023-11-29 07:49:30.992000','2023-11-29 07:49:30.992000','{\"Cookies\": \"true\", \"ColetaDeDados: \": \"true\", \"TermosDeServico\": \"true\"}',18,21),(16,'2023-11-29 08:19:22.565000','2023-11-29 08:19:22.565000','{}',21,21);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1701135684967,'default1701135684967'),(2,1701136375486,'default1701136375486'),(3,1701229802487,'default1701229802487'),(4,1701256443285,'default1701256443285');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `termos`
--

LOCK TABLES `termos` WRITE;
/*!40000 ALTER TABLE `termos` DISABLE KEYS */;
INSERT INTO `termos` VALUES (2,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"Esclarece quais dados são coletados e como serão usados.\", \"TermosDeServico\": \"Especifica as regras e condições que os usuários concordam em seguir ao usar o site.\", \"PoliticaDePrivacidade\": \"Explica como as informações dos usuários serão coletadas, usadas e protegidas.\"}','2023-11-28 02:04:14'),(19,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação\", \"ColetaDeDados\": \"Esclarece quais dados são coletados e como serão usados.\", \"TermosDeServico\": \"Especifica as regras e condições que os usuários concordam em seguir ao usar o site.\"}','2023-11-28 23:27:14'),(21,'{\"Cookies\": \"testestestestesteste\", \"ColetaDeDados: \": \"tetetetetetetetetetete\", \"TermosDeServico\": \"etetetetetetetetet\"}','2023-11-29 01:13:39');
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

-- Dump completed on 2023-11-29  8:20:39
