-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2018 at 09:36 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `achaar`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `n` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `ename` text COLLATE utf8mb4_persian_ci NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`n`, `name`, `ename`, `active`) VALUES
(1, 'ابزار سبک', 'Lightweight tools', 1);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `n` int(11) NOT NULL,
  `user` text COLLATE utf8mb4_persian_ci NOT NULL,
  `product` int(11) NOT NULL,
  `title` text COLLATE utf8mb4_persian_ci NOT NULL,
  `text` text COLLATE utf8mb4_persian_ci NOT NULL,
  `score` int(11) NOT NULL,
  `date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `approved` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`n`, `user`, `product`, `title`, `text`, `score`, `date`, `approved`) VALUES
(1, '09357778351', 1, 'عـــــــــالیه !', 'همه چی عالی\r\nبعضی دوستان میگن سیاه میشه، ولی به هیچ عنوان اینطور نیست', 100, '1517914553', 1),
(2, '09357778351', 1, 'خـــیلی بده', 'بسیار بده\r\nهی سیاه میشه\r\nهی سیاه میشه\r\nهی سیاه میشه\r\n(گیف را پخش میکند)', 10, '1517915143', 1);

-- --------------------------------------------------------

--
-- Table structure for table `discounts`
--

CREATE TABLE `discounts` (
  `n` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `percent` int(11) NOT NULL,
  `special` int(11) NOT NULL DEFAULT '0',
  `expiry_date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `discounts`
--

INSERT INTO `discounts` (`n`, `product`, `percent`, `special`, `expiry_date`, `active`) VALUES
(1, 1, 90, 1, '1517937007', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `n` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `price` bigint(20) NOT NULL,
  `category` int(11) NOT NULL,
  `available` int(11) NOT NULL DEFAULT '1',
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`n`, `name`, `price`, `category`, `available`, `active`) VALUES
(1, 'آچار', 300000, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `n` int(11) NOT NULL,
  `token` text COLLATE utf8mb4_persian_ci NOT NULL,
  `user` text COLLATE utf8mb4_persian_ci NOT NULL,
  `date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `blocked` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `n` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `mobile` text COLLATE utf8mb4_persian_ci NOT NULL,
  `password` text COLLATE utf8mb4_persian_ci NOT NULL,
  `date` text COLLATE utf8mb4_persian_ci NOT NULL,
  `blocked` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`n`, `name`, `mobile`, `password`, `date`, `blocked`) VALUES
(1, 'شایگان شکرالهی', '09357778351', '87d9bb400c0634691f0e3baaf1e2fd0d', '1517939154', 0);

-- --------------------------------------------------------

--
-- Table structure for table `warranties`
--

CREATE TABLE `warranties` (
  `n` int(11) NOT NULL,
  `product` text COLLATE utf8mb4_persian_ci NOT NULL,
  `name` text COLLATE utf8mb4_persian_ci NOT NULL,
  `period` text COLLATE utf8mb4_persian_ci NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;

--
-- Dumping data for table `warranties`
--

INSERT INTO `warranties` (`n`, `product`, `name`, `period`, `active`) VALUES
(1, '1', 'آچار ایران', '12 ماهه', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`n`);

--
-- Indexes for table `warranties`
--
ALTER TABLE `warranties`
  ADD PRIMARY KEY (`n`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `discounts`
--
ALTER TABLE `discounts`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `warranties`
--
ALTER TABLE `warranties`
  MODIFY `n` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
