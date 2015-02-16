
USE aswat;

-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Dim 15 Février 2015 à 02:01
-- Version du serveur: 5.5.40
-- Version de PHP: 5.3.10-1ubuntu3.15

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `aswat`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `enabled` smallint(6) NOT NULL DEFAULT '1',
  `parent_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_name` varchar(100) NOT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `alt` varchar(250) DEFAULT NULL,
  `title` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `image_name` (`image_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `images`
--

INSERT INTO `images` (`id`, `image_name`, `width`, `height`, `alt`, `title`) VALUES
(1, 'assets/upload/1423961705.jpeg', 0, 0, 'Picture of customer', 'Picture of customer');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `purchased` smallint(6) NOT NULL DEFAULT '0',
  `purchase_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- RELATIONS POUR LA TABLE `orders`:
--   `user_id`
--       `users` -> `id`
--

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `teaser` varchar(400) DEFAULT NULL COMMENT 'Short description',
  `description` text NOT NULL COMMENT 'Full description',
  `image_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- RELATIONS POUR LA TABLE `products`:
--   `category_id`
--       `categories` -> `id`
--   `image_id`
--       `images` -> `id`
--

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  `enabled` smallint(6) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `roles`
--

INSERT INTO `roles` (`id`, `role`, `enabled`) VALUES
(1, 'guest', 1),
(2, 'customer', 1),
(3, 'admin', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `enabled` smallint(6) NOT NULL DEFAULT '1' COMMENT '1 if enabled and 0 if disabled',
  `image_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- RELATIONS POUR LA TABLE `users`:
--   `image_id`
--       `images` -> `id`
--   `role_id`
--       `roles` -> `id`
--

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `created`, `enabled`, `image_id`, `role_id`) VALUES
(1, 'customer', '91ec1f9324753048c0096d036a694f86', 'customer@aswat-telecom.com', '0000-00-00 00:00:00', 1, 1, 2);
