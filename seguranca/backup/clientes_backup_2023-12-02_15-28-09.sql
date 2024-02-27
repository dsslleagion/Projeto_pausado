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
  `googleId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (9,'Mateus','mateus@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$UNhZZi7qSRwJMyHEg1E2t.S5v3G5kT6S1QxSVZdgQ6rlM7JaaUea.','user',NULL),(10,'teste','teste@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$4uPla00q1nRclKb8y/AoV.wV8FibnRwxt8X4k8pSgd4ruVWUqkOOm','user',NULL),(16,'Larissa','lari@gmail.com','feminino','12996354789','Rua da Fatec, 135, Pq da Fatec','$2b$10$IErIQ2kHKYPNqQASyoyJDu3gl4MvcoWczRgN2LtgXfds2hpssmNRq','user',NULL),(18,'limonada','limao@gmail.com','masculino','1234567898','Av do Limoeiro, 187, Bairro do Pomar','$2b$10$6qveLC9EunLbKfzyaDVXTui3UgJdgeRY.nOG.1Y0hhayzCS6bY3vC','user',NULL),(19,'salada','salada@gmail.com','feminino','12978562314','Avenida do Tomate, 123, Vila Alface','$2b$10$lIJjmywY6YRkdBtVRB12w.wTvUMg9OVHifEwrPPv.RtcN9.htEJaO','user',NULL),(20,'aaaa','aaa@gmail.com','masculino','123456789','aaaaaaa, 123, aaaaaa','$2b$10$NOKPI4HKVP0TRjqWiMee.O/ZuFSR7ZEDn9Eibs6HIrKs/vugkIMsa','user',NULL),(22,'Diego','diego@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$rqF93dtjbs/81IkiAn4oBOHXm2.9sWBebHPZI5EflfV2lo/pfU.FK','user',NULL),(23,'aaaaaa','aaaaa@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$nGFQawaD6Z1emaIAdl2K/.NpKngTOwDcPAAP2Jg4nQtVNmI0M5OR2','user',NULL),(24,'aaaaaa','aaaaaaa@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$09rW531GGeToMEmHYPKzoeVpylTC3o7FS3P1pZfvD08NiEWLWZL.2','user',NULL),(25,'fabio','fabio@gmail.com','masculino','12982311914','Edward Wilson Kimbask','$2b$10$GjGS9MfLX5805qZmNw9Tg.3ucUOl77PJbNts1d1B89KyUf93M8cly','user',NULL),(26,'dsad','sadsa','sad','3213','dasdsad','sadsa','user',NULL),(27,'termo','termo@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$ZLSirnzu1Cd8uB82qkbFtugmGTOn4vUdnCo5u5BxKVU85tUbJ1iQi','user',NULL),(28,'aaaaaa','aaa@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$6PNf5T1iC5QFkuZr6UOJQOn0Gm3cUlHv.jPPypk4VWkUmzV3.IdkG','user',NULL),(29,'fodase','fodase@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$bLzYTvYoCeqgVJjTN5MQl.MNCCFk1um7bDIRrtrLvSXHaMenrLf5a','admin',NULL),(30,'vida','vida@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$A4AQD67qc29e906QUd12VOcSweSdXeOyB2Adsrm0jVzejm32rgE9e','user',NULL),(31,'AAAAAAAA','yyyyy@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$JT/61UMJJQx5MBNx7hQFk.NyCCXzYD4dCDmZnNL7eQ6zWTNPKVVZ2','user',NULL),(32,'yyyy','yyyy@gmail.com','feminino','12982311914','Rua Edward Wilson Kimbask','$2b$10$cB1icluUayAbWjvu1WV27OvMt8YiUUF0ZXdPxPeZkyRQXqrITYJ3u','user',NULL),(33,'ddddd','dddd@gmail.com','masculino','12982311914','Edward Wilson Kimbask','$2b$10$4iSCM/DgOlU4ViuzKuMCduAH7XIs7c9EwLUkP1m5XZeNXUXcXOmdW','user',NULL),(34,'AAAAAAA','EEEEEEEEEEE@GMAIL.COM','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$TMD0V0bl7uYS6g.eAGzgrurJWLf9FervhY6b5D.1kyQakiUSnXWt6','user',NULL),(35,'vvvvv','vvvvv@gmail.com','masculino','rrrrr','eeeeee','$2b$10$FNlKinARNl93lHNX4gBzHuWJ8XsOWNHCtRSYv3CwxKfY5Vw67K09y','user',NULL),(36,'qqqqq','qqqq@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$ifpeIbn4AfK2SU948TXWEe2ub621LkDRADR0hqirngvjQaDMiWx1m','user',NULL),(37,'vvvv','vvvvvvv@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$K8rxo7cjlluDXWMmdDdTJua.2dFHKYyk4tHhyEbfJ9vGOzndOSrv.','user',NULL),(38,'Diego Batista','wwwww@gmail.com','masculino','12982311914','Rua Edward Wilson Kimbask','$2b$10$2LIHR0VIe/R8IsQKvc1ZAu49EkUs9X3N4.xeLz8cInOwQX11n5iUW','user',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_termos`
--

LOCK TABLES `cliente_termos` WRITE;
/*!40000 ALTER TABLE `cliente_termos` DISABLE KEYS */;
INSERT INTO `cliente_termos` VALUES (1,'2023-11-29 00:51:11.933000','2023-11-29 00:51:11.933000','{\"Cookies\": \"true\", \"ColetaDeDados\": \"true\", \"TermosDeServico\": \"false\"}',NULL,NULL),(7,'2023-11-29 01:07:33.659000','2023-11-29 01:07:33.659000','{\"Cookies\": \"true\", \"ColetaDeDados\": \"false\", \"TermosDeServico\": \"true\"}',9,19),(8,'2023-11-29 01:09:45.897000','2023-11-29 01:09:45.897000','{\"Cookies\": \"false\", \"ColetaDeDados\": \"true\", \"TermosDeServico\": \"true\"}',10,19),(15,'2023-11-29 07:49:30.992000','2023-11-29 07:49:30.992000','{\"Cookies\": \"true\", \"ColetaDeDados: \": \"true\", \"TermosDeServico\": \"true\"}',18,21),(17,'2023-11-29 09:50:22.396000','2023-11-29 09:50:22.396000','{\"Arroz\": \"true\", \"AAAAAA\": \"true\", \"EEEEEEEEE\": \"false\"}',22,22),(18,'2023-11-29 09:52:45.394000','2023-11-29 09:52:45.394000','{\"Arroz\": \"false\", \"AAAAAA\": \"false\", \"EEEEEEEEE\": \"true\"}',23,22),(19,'2023-11-29 09:54:30.120000','2023-11-29 09:54:30.120000','{\"Arroz\": \"false\", \"AAAAAA\": \"true\", \"EEEEEEEEE\": \"false\"}',24,22),(20,'2023-11-29 09:57:06.165000','2023-11-29 09:57:06.165000','{\"Arroz\": \"false\", \"AAAAAA\": \"true\", \"EEEEEEEEE\": \"false\"}',25,22),(22,'2023-12-01 22:05:21.119000','2023-12-01 22:05:21.119000','{\"Arroz\": \"true\", \"Teste\": \"true\", \"EEEEEEEEE\": \"true\", \"testeadsad\": \"true\"}',27,27),(23,'2023-12-01 22:41:27.594000','2023-12-01 22:41:27.594000','{\"Arroz\": \"true\", \"Teste\": \"false\", \"EEEEEEEEE\": \"true\", \"testeadsad\": \"false\"}',28,27),(24,'2023-12-01 22:44:20.680000','2023-12-01 22:44:20.680000','{\"Arroz\": \"true\", \"Teste\": \"false\", \"EEEEEEEEE\": \"true\", \"testeadsad\": \"false\"}',29,27),(25,'2023-12-02 11:12:32.828000','2023-12-02 11:12:32.828000','{\"Arroz\": true, \"Teste\": true, \"vvvvvvvvv\": true, \"bbbbbbbbbb\": false}',29,30),(26,'2023-12-02 11:21:04.773000','2023-12-02 11:21:04.773000','{\"Arroz\": false, \"Teste\": false, \"vvvvvvvvv\": false, \"bbbbbbbbbb\": false}',29,30),(27,'2023-12-02 11:38:52.104000','2023-12-02 11:38:52.104000','{\"Arroz\": true, \"Teste\": true, \"vvvvvvvvv\": false, \"bbbbbbbbbb\": false}',29,30),(28,'2023-12-02 11:49:25.063000','2023-12-02 11:49:25.063000','{\"Arroz\": false, \"Teste\": false, \"vvvvvvvvv\": false, \"bbbbbbbbbb\": false}',29,30),(29,'2023-12-02 12:19:57.728000','2023-12-02 12:19:57.728000','{\"Arroz\": true, \"Teste\": true, \"vvvvvvvvv\": false, \"bbbbbbbbbb\": true}',29,30),(30,'2023-12-02 12:22:10.017000','2023-12-02 12:22:10.017000','{\"Arroz\": false, \"Teste\": false, \"vvvvvvvvv\": false, \"bbbbbbbbbb\": true}',29,30),(31,'2023-12-02 12:22:58.826000','2023-12-02 12:22:58.826000','{\"Arroz\": true, \"Teste\": false, \"vvvvvvvvv\": false, \"bbbbbbbbbb\": false}',29,30),(32,'2023-12-02 12:26:02.495000','2023-12-02 12:26:02.495000','{\"ooooo\": true, \"pppppp\": true, \"gggggggg\": true, \"bbbbbbbbbb\": false}',29,36),(33,'2023-12-02 13:06:36.595000','2023-12-02 13:06:36.595000','{\"ooooo\": \"true\"}',30,36),(34,'2023-12-02 13:10:52.658000','2023-12-02 13:10:52.658000','{}',31,36),(35,'2023-12-02 13:31:36.134000','2023-12-02 13:31:36.134000','{}',32,36),(36,'2023-12-02 13:32:51.751000','2023-12-02 13:32:51.751000','{\"pppppp\": false}',29,36),(37,'2023-12-02 13:33:46.285000','2023-12-02 13:33:46.285000','{\"ooooo\": true, \"pppppp\": true, \"gggggggg\": false, \"bbbbbbbbbb\": true}',29,36),(38,'2023-12-02 13:49:54.163000','2023-12-02 13:49:54.163000','{}',33,36),(39,'2023-12-02 13:56:36.145000','2023-12-02 13:56:36.145000','{}',34,36),(40,'2023-12-02 13:59:58.539000','2023-12-02 13:59:58.539000','{}',35,36),(41,'2023-12-02 14:13:41.782000','2023-12-02 14:13:41.782000','{}',36,36),(42,'2023-12-02 14:17:00.446000','2023-12-02 14:17:00.446000','{}',37,36),(43,'2023-12-02 14:18:39.416000','2023-12-02 14:18:39.416000','{}',38,36),(44,'2023-12-02 14:30:14.057000','2023-12-02 14:30:14.057000','{\"pppppp\": true}',29,36),(45,'2023-12-02 14:30:15.832000','2023-12-02 14:30:15.832000','{\"pppppp\": true}',29,36);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1701135684967,'default1701135684967'),(2,1701136375486,'default1701136375486'),(3,1701229802487,'default1701229802487'),(4,1701256443285,'default1701256443285'),(5,1701393825454,'Default1701393825454');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `termos`
--

LOCK TABLES `termos` WRITE;
/*!40000 ALTER TABLE `termos` DISABLE KEYS */;
INSERT INTO `termos` VALUES (2,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação.\", \"ColetaDeDados\": \"Esclarece quais dados são coletados e como serão usados.\", \"TermosDeServico\": \"Especifica as regras e condições que os usuários concordam em seguir ao usar o site.\", \"PoliticaDePrivacidade\": \"Explica como as informações dos usuários serão coletadas, usadas e protegidas.\"}','2023-11-28 02:04:14'),(19,'{\"Cookies\": \"Informa sobre o uso de cookies para coletar dados de navegação\", \"ColetaDeDados\": \"Esclarece quais dados são coletados e como serão usados.\", \"TermosDeServico\": \"Especifica as regras e condições que os usuários concordam em seguir ao usar o site.\"}','2023-11-28 23:27:14'),(21,'{\"Cookies\": \"testestestestesteste\", \"ColetaDeDados: \": \"tetetetetetetetetetete\", \"TermosDeServico\": \"etetetetetetetetet\"}','2023-11-29 01:13:39'),(22,'{\"Arroz\": \"arroz com feijao\", \"AAAAAA\": \"AAAAAAA\", \"EEEEEEEEE\": \"EEEEEEEE\"}','2023-11-29 09:44:45'),(23,'{\"Vasco\": \"    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n\", \"Use linux\": \"    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n\", \"Vamooooooooooooo\": \"    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe consectetur quidem cupiditate assumenda harum ipsa. Eaque hic iure consequatur id dolores laudantium ad? Dicta laudantium reprehenderit autem, labore doloribus sequi!\\n\"}','2023-12-01 09:57:08'),(24,'{\"Teste\": \"TEste\", \"Linux \": \"VAsco\"}','2023-12-01 15:29:14'),(25,'{\"Arroz\": \"arroz com feijao\", \"Teste\": \"TEste\", \"EEEEEEEEE\": \"EEEEEEEE\"}','2023-12-01 20:41:23'),(26,'{\"Arroz\": \"arroz com feijao\", \"Teste\": \"TEste\", \"aaaaa\": \"aaaaaaa\", \"aaaaaaa\": \"aaaaa\", \"EEEEEEEEE\": \"EEEEEEEE\", \"aaaaaaaaa\": \"aaaaaaaa\"}','2023-12-01 21:11:43'),(27,'{\"Arroz\": \"arroz com feijao\", \"Teste\": \"TEste\", \"EEEEEEEEE\": \"EEEEEEEE\", \"testeadsad\": \"stetetete\"}','2023-12-01 21:36:45'),(28,'{\"Teste\": \"TEste\", \"Linux \": \"VAsco\", \"eeeeee\": \"eeeeeee\"}','2023-12-02 09:49:09'),(29,'{\"Linux \": \"VAsco\", \"oooooooo\": \"oooooo\", \"iiiiiiiiii\": \"iiiiiiiii\"}','2023-12-02 10:03:23'),(30,'{\"Arroz\": \"arroz com feijao\", \"Teste\": \"TEste\", \"vvvvvvvvv\": \"vvvvvvvv\", \"bbbbbbbbbb\": \"bbbbbbbbb\"}','2023-12-02 10:07:29'),(36,'{\"ooooo\": \"ooooo\", \"pppppp\": \"ppppp\", \"gggggggg\": \"ggggggg\", \"bbbbbbbbbb\": \"bbbbbbbbb\"}','2023-12-02 12:24:21'),(37,'{\"wwww\": \"wwww\", \"eeeeee\": \"eeeee\"}','2023-12-02 14:39:44'),(38,'{\"wwww\": \"wwww\", \"eeeeee\": \"eeeee\", \"rrrrrrrrrrrrrrrr\": \"rrrrrrrrrrrrrrrrr\"}','2023-12-02 14:44:13'),(39,'{\"olc\": \"olc\", \"teste\": \"teste\", \"rrrrrrr\": \"rrrrrrrrr\", \"kkkkkkkk\": \"kkkkkk\"}','2023-12-02 14:47:16');
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

-- Dump completed on 2023-12-02 15:28:21
