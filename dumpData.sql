-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: salcash
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `advance_request`
--

DROP TABLE IF EXISTS `advance_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advance_request` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `employee_details_id` int DEFAULT NULL,
  `request_amount` int DEFAULT NULL,
  `approved_amount` int DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `approve_date` date DEFAULT NULL,
  `company_comment` varchar(255) DEFAULT NULL,
  `bank_comment` varchar(255) DEFAULT NULL,
  `transfer_status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`),
  KEY `company_id` (`company_id`),
  KEY `employee_id` (`employee_id`),
  KEY `employee_details_id` (`employee_details_id`),
  CONSTRAINT `advance_request_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`),
  CONSTRAINT `advance_request_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`_id`),
  CONSTRAINT `advance_request_ibfk_3` FOREIGN KEY (`employee_details_id`) REFERENCES `employee_details` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `nick_name` varchar(50) DEFAULT NULL,
  `industry` text NOT NULL,
  `address` longtext,
  `business_registration_number` varchar(255) NOT NULL,
  `type_of_incorporation` enum('public limited','private limited','sole proprietor','partnership','others') NOT NULL,
  `date_of_incorporation` date NOT NULL,
  `company_contact_number` bigint DEFAULT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `notes` longtext,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `business_registration_number` (`business_registration_number`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_approval`
--

DROP TABLE IF EXISTS `company_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_approval` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `employee_details_id` int DEFAULT NULL,
  `approval_type` enum('Active','Inactive','Suspended') DEFAULT 'Active',
  `related_table` varchar(255) DEFAULT NULL,
  `proposed_changes_description` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `approval_status` enum('Active','Inactive','Suspended') DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`),
  KEY `company_id` (`company_id`),
  KEY `employee_id` (`employee_id`),
  KEY `employee_details_id` (`employee_details_id`),
  CONSTRAINT `company_approval_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`),
  CONSTRAINT `company_approval_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`_id`),
  CONSTRAINT `company_approval_ibfk_3` FOREIGN KEY (`employee_details_id`) REFERENCES `employee_details` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_carder`
--

DROP TABLE IF EXISTS `company_carder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_carder` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `company_carder_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_configuration`
--

DROP TABLE IF EXISTS `company_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_configuration` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `company_location_configuration_id` int DEFAULT NULL,
  `bank_id` int NOT NULL,
  `bank_company_configuration_id` int NOT NULL,
  `bank_company_status` tinyint(1) DEFAULT '1',
  `max_percentage_override` int NOT NULL,
  `withdrawal_form` date DEFAULT NULL,
  `withdrawal_to` date DEFAULT NULL,
  `salary_date` date NOT NULL,
  `month_start` date NOT NULL,
  `month_end` date NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `bank_id` (`bank_id`),
  UNIQUE KEY `bank_company_configuration_id` (`bank_company_configuration_id`),
  KEY `company_id` (`company_id`),
  KEY `company_location_configuration_id` (`company_location_configuration_id`),
  CONSTRAINT `company_configuration_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`),
  CONSTRAINT `company_configuration_ibfk_2` FOREIGN KEY (`company_location_configuration_id`) REFERENCES `company_location_configuration` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_department`
--

DROP TABLE IF EXISTS `company_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_department` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_of_hod` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `description` longtext,
  PRIMARY KEY (`_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `company_department_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_location`
--

DROP TABLE IF EXISTS `company_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_location` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `address` longtext,
  PRIMARY KEY (`_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `company_location_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_location_configuration`
--

DROP TABLE IF EXISTS `company_location_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_location_configuration` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `carder_id` int DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `company_id` (`company_id`,`location_id`,`department_id`,`carder_id`),
  KEY `location_id` (`location_id`),
  KEY `department_id` (`department_id`),
  KEY `carder_id` (`carder_id`),
  CONSTRAINT `company_location_configuration_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`),
  CONSTRAINT `company_location_configuration_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `company_location` (`_id`),
  CONSTRAINT `company_location_configuration_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `company_department` (`_id`),
  CONSTRAINT `company_location_configuration_ibfk_4` FOREIGN KEY (`carder_id`) REFERENCES `company_carder` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `nic` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `nic` (`nic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee_details`
--

DROP TABLE IF EXISTS `employee_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_details` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `employee_summary_id` int DEFAULT NULL,
  `company_location_configuration_id` int DEFAULT NULL,
  `employee_number` varchar(255) NOT NULL,
  `employee_status` enum('Active','Inactive','Suspended') DEFAULT 'Active',
  `employee_salary` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `bank_branch` varchar(255) DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `employee_number` (`employee_number`),
  KEY `company_id` (`company_id`),
  KEY `employee_id` (`employee_id`),
  KEY `employee_summary_id` (`employee_summary_id`),
  KEY `company_location_configuration_id` (`company_location_configuration_id`),
  CONSTRAINT `employee_details_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`_id`),
  CONSTRAINT `employee_details_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`_id`),
  CONSTRAINT `employee_details_ibfk_3` FOREIGN KEY (`employee_summary_id`) REFERENCES `employee_summary` (`_id`),
  CONSTRAINT `employee_details_ibfk_4` FOREIGN KEY (`company_location_configuration_id`) REFERENCES `company_location_configuration` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employee_summary`
--

DROP TABLE IF EXISTS `employee_summary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_summary` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `data` json DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-12 13:07:40
