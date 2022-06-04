CREATE DATABASE  IF NOT EXISTS `legion_latinoamericana_website` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `legion_latinoamericana_website`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: legion_latinoamericana_website
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `awards`
--

DROP TABLE IF EXISTS `awards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `awards` (
  `idaward` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `lore` text,
  `type` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `visible` tinyint DEFAULT '1',
  PRIMARY KEY (`idaward`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `awards`
--

LOCK TABLES `awards` WRITE;
/*!40000 ALTER TABLE `awards` DISABLE KEYS */;
INSERT INTO `awards` VALUES (1,'Medalla de honor','No lore','personalDistinctions','medalOfHonor.png',1);
/*!40000 ALTER TABLE `awards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clansettings`
--

DROP TABLE IF EXISTS `clansettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clansettings` (
  `tag` varchar(255) NOT NULL,
  `value` int DEFAULT NULL,
  PRIMARY KEY (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clansettings`
--

LOCK TABLES `clansettings` WRITE;
/*!40000 ALTER TABLE `clansettings` DISABLE KEYS */;
INSERT INTO `clansettings` VALUES ('maxLimitToRequestCoursePerUser',3);
/*!40000 ALTER TABLE `clansettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discovered`
--

DROP TABLE IF EXISTS `discovered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discovered` (
  `iddiscovered` int NOT NULL AUTO_INCREMENT,
  `en` varchar(255) DEFAULT NULL,
  `es` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iddiscovered`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discovered`
--

LOCK TABLES `discovered` WRITE;
/*!40000 ALTER TABLE `discovered` DISABLE KEYS */;
INSERT INTO `discovered` VALUES (1,'ingles','español');
/*!40000 ALTER TABLE `discovered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructors` (
  `iduser` bigint NOT NULL,
  `idrole` int NOT NULL,
  KEY `fk_instructors-roles_idx` (`idrole`),
  KEY `fk_instructors-users_idx` (`iduser`),
  CONSTRAINT `fk_instructors-roles` FOREIGN KEY (`idrole`) REFERENCES `roles` (`idrole`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_instructors-users` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES (1,1);
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `missions`
--

DROP TABLE IF EXISTS `missions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `missions` (
  `idmission` bigint NOT NULL AUTO_INCREMENT,
  `datetime` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `creator` bigint NOT NULL,
  PRIMARY KEY (`idmission`),
  KEY `fk_mission-users_idx` (`creator`),
  CONSTRAINT `fk_mission-users` FOREIGN KEY (`creator`) REFERENCES `users` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missions`
--

LOCK TABLES `missions` WRITE;
/*!40000 ALTER TABLE `missions` DISABLE KEYS */;
INSERT INTO `missions` VALUES (1,'1999-09-25 00:00:00','test',1);
/*!40000 ALTER TABLE `missions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `missionsattendances`
--

DROP TABLE IF EXISTS `missionsattendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `missionsattendances` (
  `iduser` bigint NOT NULL,
  `idmission` bigint NOT NULL,
  `assists` tinyint DEFAULT '0',
  `excuse` tinyint DEFAULT '0',
  KEY `fk_missionsattendances-users_idx` (`iduser`),
  KEY `fk_missionsattendances-missions_idx` (`idmission`),
  CONSTRAINT `fk_missionsattendances-missions` FOREIGN KEY (`idmission`) REFERENCES `missions` (`idmission`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_missionsattendances-users` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `missionsattendances`
--

LOCK TABLES `missionsattendances` WRITE;
/*!40000 ALTER TABLE `missionsattendances` DISABLE KEYS */;
/*!40000 ALTER TABLE `missionsattendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ranks`
--

DROP TABLE IF EXISTS `ranks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ranks` (
  `idrank` int NOT NULL AUTO_INCREMENT,
  `infantry` tinyint DEFAULT '0',
  `airforce` tinyint DEFAULT '0',
  `tag` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `visible` tinyint DEFAULT '1',
  PRIMARY KEY (`idrank`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranks`
--

LOCK TABLES `ranks` WRITE;
/*!40000 ALTER TABLE `ranks` DISABLE KEYS */;
INSERT INTO `ranks` VALUES (1,0,0,'Civ','Civil',NULL,1),(2,1,0,'Rta','Recluta',NULL,1),(3,1,0,'Sdo','Soldado','private.png',1);
/*!40000 ALTER TABLE `ranks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idrole` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` longtext,
  `request` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idrole`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'fusilero',NULL,1),(2,'granadero',NULL,1),(3,'medico',NULL,1),(4,'antitanque / antiaereo',NULL,1);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles-users-requests`
--

DROP TABLE IF EXISTS `roles-users-requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles-users-requests` (
  `idrole` int NOT NULL,
  `iduser` bigint NOT NULL,
  `datetime` datetime DEFAULT NULL,
  KEY `fk_(roles-users-requests)-roles_idx` (`idrole`),
  KEY `fk_(roles-users-requests)-users_idx` (`iduser`),
  CONSTRAINT `fk_(roles-users-requests)-roles` FOREIGN KEY (`idrole`) REFERENCES `roles` (`idrole`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_(roles-users-requests)-users` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles-users-requests`
--

LOCK TABLES `roles-users-requests` WRITE;
/*!40000 ALTER TABLE `roles-users-requests` DISABLE KEYS */;
INSERT INTO `roles-users-requests` VALUES (1,2,'2022-06-03 03:26:15'),(2,2,'2022-06-04 04:53:53'),(4,2,'2022-06-04 04:53:59'),(3,1,'2022-06-04 05:44:00'),(2,1,'2022-06-04 05:44:44');
/*!40000 ALTER TABLE `roles-users-requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesrequests`
--

DROP TABLE IF EXISTS `rolesrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesrequests` (
  `idrole` int NOT NULL,
  `rolerequest` int NOT NULL,
  KEY `fk_(rolesrequests)-roles_idx` (`idrole`),
  KEY `fk_(rolesrequests)-roles_2_idx` (`rolerequest`),
  CONSTRAINT `fk_(rolesrequests)-roles` FOREIGN KEY (`idrole`) REFERENCES `roles` (`idrole`),
  CONSTRAINT `fk_(rolesrequests)-roles_2` FOREIGN KEY (`rolerequest`) REFERENCES `roles` (`idrole`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesrequests`
--

LOCK TABLES `rolesrequests` WRITE;
/*!40000 ALTER TABLE `rolesrequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolesrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesrequests-blacklist`
--

DROP TABLE IF EXISTS `rolesrequests-blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolesrequests-blacklist` (
  `idrank` int NOT NULL,
  PRIMARY KEY (`idrank`),
  CONSTRAINT `fk_(rolesrequests-blacklist)-ranks` FOREIGN KEY (`idrank`) REFERENCES `ranks` (`idrank`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesrequests-blacklist`
--

LOCK TABLES `rolesrequests-blacklist` WRITE;
/*!40000 ALTER TABLE `rolesrequests-blacklist` DISABLE KEYS */;
/*!40000 ALTER TABLE `rolesrequests-blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `squads`
--

DROP TABLE IF EXISTS `squads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `squads` (
  `idsquad` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `leader` bigint DEFAULT NULL,
  PRIMARY KEY (`idsquad`),
  KEY `fk_squads-users_idx` (`leader`),
  CONSTRAINT `fk_squads-users` FOREIGN KEY (`leader`) REFERENCES `users` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `squads`
--

LOCK TABLES `squads` WRITE;
/*!40000 ALTER TABLE `squads` DISABLE KEYS */;
INSERT INTO `squads` VALUES (1,'Mando',NULL),(2,'Alpha',NULL),(3,'Bravo',NULL),(4,'Charlie',NULL),(5,'Foxtrot',NULL),(6,'Zulu',1);
/*!40000 ALTER TABLE `squads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `squadsattendances`
--

DROP TABLE IF EXISTS `squadsattendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `squadsattendances` (
  `iduser` bigint NOT NULL,
  `idsquadtraining` bigint NOT NULL,
  `assists` tinyint DEFAULT '0',
  `excuse` tinyint DEFAULT '0',
  KEY `fk_squadsattendances-users_idx` (`iduser`),
  KEY `fk_squadsattendances-squadstrainins_idx` (`idsquadtraining`),
  CONSTRAINT `fk_squadsattendances-squadstrainins` FOREIGN KEY (`idsquadtraining`) REFERENCES `squadstrainings` (`idsquadtraining`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_squadsattendances-users` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `squadsattendances`
--

LOCK TABLES `squadsattendances` WRITE;
/*!40000 ALTER TABLE `squadsattendances` DISABLE KEYS */;
/*!40000 ALTER TABLE `squadsattendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `squadstrainings`
--

DROP TABLE IF EXISTS `squadstrainings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `squadstrainings` (
  `idsquadtraining` bigint NOT NULL AUTO_INCREMENT,
  `idsquad` int NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`idsquadtraining`),
  KEY `fk_squadstrainings-squads_idx` (`idsquad`),
  CONSTRAINT `fk_squadstrainings-squads` FOREIGN KEY (`idsquad`) REFERENCES `squads` (`idsquad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `squadstrainings`
--

LOCK TABLES `squadstrainings` WRITE;
/*!40000 ALTER TABLE `squadstrainings` DISABLE KEYS */;
INSERT INTO `squadstrainings` VALUES (1,6,'1999-09-25 00:00:00');
/*!40000 ALTER TABLE `squadstrainings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userextras`
--

DROP TABLE IF EXISTS `userextras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userextras` (
  `iduser` bigint NOT NULL,
  `cbi` tinyint DEFAULT '0',
  `idrank` int DEFAULT NULL,
  `defaultrole` int DEFAULT NULL,
  `idsquad` int DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `iduser_UNIQUE` (`iduser`) /*!80000 INVISIBLE */,
  KEY `fk_userextra-roles_idx` (`defaultrole`),
  KEY `fk_userextra-squad_idx` (`idsquad`),
  CONSTRAINT `fk_userextra-roles` FOREIGN KEY (`defaultrole`) REFERENCES `roles` (`idrole`),
  CONSTRAINT `fk_userextra-squad` FOREIGN KEY (`idsquad`) REFERENCES `squads` (`idsquad`),
  CONSTRAINT `fk_userextra-user` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userextras`
--

LOCK TABLES `userextras` WRITE;
/*!40000 ALTER TABLE `userextras` DISABLE KEYS */;
INSERT INTO `userextras` VALUES (1,1,3,1,6),(2,1,1,1,NULL);
/*!40000 ALTER TABLE `userextras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `iduser` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `lang` varchar(2) NOT NULL,
  `activated` tinyint DEFAULT '0',
  `permissions` tinyint(1) DEFAULT '0',
  `status` tinyint DEFAULT '1',
  `staff` tinyint DEFAULT '0',
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'leomad','$2a$12$mnJbv.ayjAWcnYS2gi/a0OStdBXRnwBN9lfSQVxJ9qDX4vfgzveC6','leomad-25@hotmail.com','en',1,5,1,1),(2,'test','$2a$12$sQy2ySUZO0.KGi6yfmIzEe5hvikoHV.Fn61H3B5HsOnVRpq/AGHa.','test@test.test','en',1,0,1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users-awards`
--

DROP TABLE IF EXISTS `users-awards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users-awards` (
  `iduser` bigint NOT NULL,
  `idaward` int NOT NULL,
  `amount` int DEFAULT '1',
  KEY `fk_(users-awards)-awards_idx` (`idaward`),
  KEY `fk_(users-awards)-users_idx` (`iduser`),
  CONSTRAINT `fk_(users-awards)-awards` FOREIGN KEY (`idaward`) REFERENCES `awards` (`idaward`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_(users-awards)-users` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users-awards`
--

LOCK TABLES `users-awards` WRITE;
/*!40000 ALTER TABLE `users-awards` DISABLE KEYS */;
INSERT INTO `users-awards` VALUES (1,1,1);
/*!40000 ALTER TABLE `users-awards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users-discovered`
--

DROP TABLE IF EXISTS `users-discovered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users-discovered` (
  `iduser` bigint NOT NULL,
  `reason` text,
  `iddiscovered` int DEFAULT NULL,
  `tellus` text,
  PRIMARY KEY (`iduser`),
  KEY `fk_users-discovered-users_idx` (`iduser`),
  KEY `fk_users-discovered-discovered_idx` (`iddiscovered`),
  CONSTRAINT `fk_users-discovered-discovered` FOREIGN KEY (`iddiscovered`) REFERENCES `discovered` (`iddiscovered`),
  CONSTRAINT `fk_users-discovered-users` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users-discovered`
--

LOCK TABLES `users-discovered` WRITE;
/*!40000 ALTER TABLE `users-discovered` DISABLE KEYS */;
INSERT INTO `users-discovered` VALUES (1,'none',1,NULL),(2,'test',1,NULL);
/*!40000 ALTER TABLE `users-discovered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users-roles`
--

DROP TABLE IF EXISTS `users-roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users-roles` (
  `iduser` bigint NOT NULL,
  `idrole` int NOT NULL,
  KEY `fk_(users-roles)-user_idx` (`iduser`),
  KEY `fk_(users-roles)-roles_idx` (`idrole`),
  CONSTRAINT `fk_(users-roles)-roles` FOREIGN KEY (`idrole`) REFERENCES `roles` (`idrole`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_(users-roles)-users` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users-roles`
--

LOCK TABLES `users-roles` WRITE;
/*!40000 ALTER TABLE `users-roles` DISABLE KEYS */;
INSERT INTO `users-roles` VALUES (1,1);
/*!40000 ALTER TABLE `users-roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-04  6:24:47
