-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: travel_listing_db
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_table`
--

DROP TABLE IF EXISTS `admin_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_table` (
  `adminID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Auto Increment Admin ID',
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL COMMENT 'Name of admin',
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`adminID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_table`
--

LOCK TABLES `admin_table` WRITE;
/*!40000 ALTER TABLE `admin_table` DISABLE KEYS */;
INSERT INTO `admin_table` VALUES (1,'hanming@hotmail.com','Pass1234','Han Ming','Admin'),(2,'kelvinw@gmail.com','Pass!@#$','Kelvin Wong','user'),(3,'pauly@yahoo.com','Pass5678','Paul Yang','user');
/*!40000 ALTER TABLE `admin_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itinerary_table`
--

DROP TABLE IF EXISTS `itinerary_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itinerary_table` (
  `itineraryId` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Auto Increment ID ',
  `day` int(2) NOT NULL COMMENT 'Integer (eg 1,2 etc)',
  `activity` varchar(100) NOT NULL COMMENT 'Description of activity',
  `travelId` int(11) NOT NULL,
  PRIMARY KEY (`itineraryId`),
  KEY `travelId_idx` (`travelId`),
  CONSTRAINT `travelId` FOREIGN KEY (`travelId`) REFERENCES `travel_listing_table` (`travelID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itinerary_table`
--

LOCK TABLES `itinerary_table` WRITE;
/*!40000 ALTER TABLE `itinerary_table` DISABLE KEYS */;
INSERT INTO `itinerary_table` VALUES (5,1,'Arrival and Explore Kuta and Ubud',1),(6,2,'North Bali - Menjangan Island',1),(7,3,'Water Activities and Nature Walk',1),(8,4,'Food Tour and depart Bali',1),(9,1,'Arrival and Explore Auckland',2),(10,2,'Queenstown',2),(11,3,'Queenstown to Te Anau',2),(12,4,'Te Anau to Milford Sound to Wanaka',2),(13,5,'Wanaka and surroundings',2),(14,6,'Wanaka to Franz Josef',2),(15,7,'Franz Josef Glacier',2),(16,8,'Franz Josef to Christchurch and depart Auckland',2);
/*!40000 ALTER TABLE `itinerary_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_listing_table`
--

DROP TABLE IF EXISTS `travel_listing_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travel_listing_table` (
  `travelID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Auto Increment ID',
  `title` varchar(45) NOT NULL COMMENT 'Title of electronic product',
  `description` varchar(45) NOT NULL COMMENT 'Description',
  `price` decimal(6,2) NOT NULL,
  `country` varchar(45) NOT NULL COMMENT 'Country',
  `travel_period` varchar(45) NOT NULL COMMENT 'travel month and year',
  `image_url` varchar(1000) DEFAULT NULL COMMENT 'Image url of listing location highligh',
  `date_inserted` datetime NOT NULL COMMENT 'default value of current_timestamp()',
  PRIMARY KEY (`travelID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_listing_table`
--

LOCK TABLES `travel_listing_table` WRITE;
/*!40000 ALTER TABLE `travel_listing_table` DISABLE KEYS */;
INSERT INTO `travel_listing_table` VALUES (1,'The Sea Explorer','At the Coral Garden',899.00,'Bali','4 days','https://images.unsplash.com/photo-1559489031-fbaf8fe8e947?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80','2020-06-20 22:08:41'),(2,'The Forest Hiker','At the Mount Nicholas',3888.00,'New Zealand','8 days','https://images.unsplash.com/photo-1506777438561-990bb0ab05d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80','2020-06-20 22:08:41'),(3,'The Snow Adventure','At the base of Mount Fuji',2999.00,'Tokyo Japan','5 days','https://images.unsplash.com/photo-1560235030-d8778da779df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80','2020-06-20 22:08:41'),(5,'Test Title 2','Test Description 2',1200.00,'Test Country 2','Test Travel Period 2','Test Image URL  2','2020-06-21 18:21:36'),(6,'1','2',33.00,'1','1','1','2020-06-22 19:44:50'),(7,'1','2',33.00,'1','1','1','2020-06-22 20:07:48'),(8,'1','2',33.00,'1','1','','2020-06-22 20:08:03'),(10,'City Tour','See merlion',45.00,'Singapore','3 days','https://images.unsplash.com/photo-1506777438561-990bb0ab05d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80','2020-08-10 19:47:36');
/*!40000 ALTER TABLE `travel_listing_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-10 23:49:16
