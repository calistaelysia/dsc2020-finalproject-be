-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2021 at 03:14 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `indonesia_covid_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(9) NOT NULL,
  `name` varchar(50) NOT NULL,
  `recovered` int(100) NOT NULL,
  `death` int(100) NOT NULL,
  `positive` int(100) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`id`, `name`, `recovered`, `death`, `positive`, `url`, `created_at`, `update_at`, `deleted_at`) VALUES
(1, 'DKI Jakarta', 83338, 2120, 98206, '/api/v1/provinces/1', '2021-02-04 11:36:28', NULL, NULL),
(2, 'Sulawesi Barat', 1234, 987, 34567, '/api/v1/provinces/2', '2021-02-04 11:36:28', NULL, NULL),
(3, 'Kalimatan Timur', 1234, 987, 34567, '/api/v1/provinces/3', '2021-02-04 11:36:28', NULL, NULL),
(4, 'Maluku', 1234, 987, 34567, '/api/v1/provinces/4', '2021-02-05 00:08:16', NULL, NULL),
(5, 'Makasar', 1234, 987, 34567, '/api/v1/provinces/5', '2021-02-05 00:43:15', NULL, NULL),
(6, 'Papua', 1234, 987, 34567, '/api/v1/provinces/6', '2021-02-05 09:05:17', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
