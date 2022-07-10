-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lms-db
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bookName` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `publishedYear` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (2,'Random Math','Donna Mayert','Thu Aug 12 2021 01:29:53 GMT+0530 (India Standard Time)','Try to calculate the SQL sensor, maybe it will transmit the back-end protocol!','Available','https://i.ibb.co/Nt7R5LP/book-mockup-removebg-preview.png','2022-07-01 23:40:07'),(3,'California Butterfly','Evelyn Ritchie','Thu Oct 28 2021 16:33:31 GMT+0530 (India Standard Time)','Try to calculate the SQL sensor, maybe it will transmit the back-end protocol!','Available','https://i.ibb.co/Nt7R5LP/book-mockup-removebg-preview.png','2022-07-06 15:13:45'),(4,'Monster Hero','Rachael Conn DVM','Wed Sep 01 2021 14:52:09 GMT+0530 (India Standard Time)','Try to calculate the SQL sensor, maybe it will transmit the back-end protocol!','Available','https://i.ibb.co/Nt7R5LP/book-mockup-removebg-preview.png','2022-07-06 15:41:13'),(5,'Crazy Sandwitch','Maryann Simonis','Wed Nov 17 2021 20:49:14 GMT+0530 (India Standard Time)','Try to calculate the SQL sensor, maybe it will transmit the back-end protocol!','Available','https://i.ibb.co/Nt7R5LP/book-mockup-removebg-preview.png','2022-07-06 15:45:14'),(6,'Gloves','Peter Kautzer','Wed Aug 11 2021 05:18:42 GMT+0530 (India Standard Time)','Try to synthesize the PCI matrix, maybe it will calculate the multi-byte firewall!','Available','https://i.ibb.co/Nt7R5LP/book-mockup-removebg-preview.png','2022-07-06 16:35:53'),(16,'Lacota Rosario','Esse mollit repudian','2007-04-02','Voluptatibus optio ','Available','https://i.ibb.co/Nt7R5LP/book-mockup-removebg-preview.png','2022-07-09 13:55:51');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_booking`
--

DROP TABLE IF EXISTS `book_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_booking` (
  `booking_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`booking_id`,`book_id`),
  KEY `fk_booking_has_book_book1_idx` (`book_id`),
  KEY `fk_booking_has_book_booking1_idx` (`booking_id`),
  CONSTRAINT `fk_booking_has_book_book1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`),
  CONSTRAINT `fk_booking_has_book_booking1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_booking`
--

LOCK TABLES `book_booking` WRITE;
/*!40000 ALTER TABLE `book_booking` DISABLE KEYS */;
INSERT INTO `book_booking` VALUES (19,2),(22,2),(23,2),(25,2),(27,2),(28,2),(30,2),(20,5),(21,5),(29,5),(24,6),(26,6);
/*!40000 ALTER TABLE `book_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_booking_user_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (19,'Returned',10,'2022-07-09 11:54:38'),(20,'Returned',10,'2022-07-09 11:54:43'),(21,'Issued',10,'2022-07-09 11:57:29'),(22,'Issued',10,'2022-07-09 11:58:37'),(23,'Issued',10,'2022-07-09 12:45:48'),(24,'Returned',10,'2022-07-09 12:48:45'),(25,'Issued',10,'2022-07-09 14:20:01'),(26,'Issued',10,'2022-07-09 14:22:56'),(27,'Issued',10,'2022-07-09 14:26:14'),(28,'Issued',10,'2022-07-09 18:00:42'),(29,'Issued',10,'2022-07-09 18:00:44'),(30,'Issued',10,'2022-07-10 12:50:42');
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'Bethany Legros','admin@lms.com','$2a$10$frYYTJ1OcbeemvXY8anX8.JM94lR9szp1TVyW.e2Uoq3td8VNKC7.','1666 Marvin Ports','admin','active','Level-01','2022-07-07 20:17:09'),(8,'Oscar Sutton','zihurad@mailinator.com','$2a$10$uz7m7l8ueJ8TMM7iRsEi5uLd1L5ThpVwh5dZL8/bghluoCqj3tSXC','Incidunt accusamus ','student','Blacklisted','Level-1','2022-07-07 23:16:20'),(9,'Tamara Bradshaw','lypokimi@mailinator.com','$2a$10$BxemM.v2ros5EeYSsF75Ee51ua1lMKc2PqcWIJCmmsJsO5TsF82By','Recusandae Pariatur','student','Active','Level-2','2022-07-07 23:21:03'),(10,'Aurora Hoover Medina','student@lms.com','$2a$10$KaW5OthwoTsGSb4jofkUpubkYawSttibYvpE256CKSJsZ7RE0GVay','Aperiam velit sit q','student','Active','Level-1','2022-07-08 07:40:36');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-10 12:57:55
