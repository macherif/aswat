
USE aswat;

-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Dim 01 Mars 2015 à 02:29
-- Version du serveur: 5.5.41
-- Version de PHP: 5.3.10-1ubuntu3.16

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `aswat`
--

-- --------------------------------------------------------

--cd
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `enabled`, `parent_id`) VALUES
(3, 'Apple iPhone', 1, 0),
(4, 'Apple iPad', 1, 0),
(5, 'Samsung S series', 1, 0),
(6, 'Samsung Galaxy Tab Series', 1, 0),
(7, 'Test Category', 1, 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Contenu de la table `images`
--

INSERT INTO `images` (`id`, `image_name`, `width`, `height`, `alt`, `title`) VALUES
(12, 'assets/upload/1423961705.jpeg', 0, 0, 'Picture of customer', 'Picture of customer'),
(13, 'assets/upload/1424124824.png', 0, 0, 'Picture of admin', 'Picture of admin'),
(15, 'assets/upload/1425075400.jpeg', 0, 0, 'Picture of iPhone 5s', 'Picture of iPhone 5s'),
(16, 'assets/upload/1425075651.png', 0, 0, 'Picture of iPad mini 3', 'Picture of iPad mini 3'),
(17, 'assets/upload/1425075801.jpeg', 0, 0, 'Picture of Galaxy S5', 'Picture of Galaxy S5'),
(18, 'assets/upload/1425075948.png', 0, 0, 'Picture of Samsung Galaxy S4', 'Picture of Samsung Galaxy S4'),
(19, 'assets/upload/1425076075.jpeg', 0, 0, 'Picture of Samsung Galaxy Tab 2', 'Picture of Samsung Galaxy Tab 2'),
(22, 'assets/upload/1425087899.jpeg', 0, 0, 'Picture of iPhone 6', 'Picture of iPhone 6');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `products`
--

INSERT INTO `products` (`id`, `product_name`, `teaser`, `description`, `image_id`, `category_id`, `price`) VALUES
(1, 'iPhone 6', 'iPhone 6 isn’t simply bigger — it’s better in every way. Larger, yet dramatically thinner. More powerful, but remarkably power efficient. With a smooth metal surface that seamlessly meets the new Retina HD display. It’s one continuous form where hardware and software function in perfect unison, creating a new generation of iPhone that’s better by any measure.', 'In creating iPhone 6, we scrutinized every element and material. That’s how we arrived at a smooth, continuous form. A thinner profile made possible by our thinnest display yet. And intuitively placed buttons. All made with beautiful anodized aluminum, stainless steel, and glass. It’s a thousand tiny details that add up to something big. Or in this case, two big things: iPhone 6 and iPhone 6 Plus.', 22, 3, 233),
(2, 'iPhone 5s', 'Retina display\n4-inch (diagonal) LED-backlit widescreen Multi-Touch display with IPS technology\n1136-by-640-pixel resolution at 326 ppi', 'iPhone 5s embodies Apple’s continuing environmental progress. It is designed with the following features to reduce environmental impact:\n\n    Mercury-free LED-backlit display\n    Arsenic-free display glass\n    Brominated flame retardant-free\n    PVC-free\n    Recyclable aluminum enclosure\n    Power adapter outperforms strictest global energy efficiency standards', 15, 3, 100),
(3, 'iPad mini 3', 'Protect every pixel of iPad mini 3 with a Smart Cover or Smart Case. Available in seven bright new colors, the Smart Cover is made from durable polyurethane. The Smart Case, in rich aniline-dyed leather, protects both the front and back of your iPad mini.', 'iOS 8 and iPad mini 3. A powerful combination.\n\niOS 8 is the most advanced mobile OS ever, with features that make iPad mini 3 even more indispensable. Continuity lets you start a project on one device and ﬁnish it on another. Family Sharing lets up to six people in your family share movies, books, music, and apps. With iCloud Drive, you can safely store any kind of document and access it from any device. In fact, every feature in iOS 8 is designed to work seamlessly with iPad mini, taking full advantage of its powerful A7 chip, ultrafast wireless, and brilliant Retina display.', 16, 4, 300),
(4, 'Galaxy S5', 'The Samsung Galaxy S5 is one of the hottest phones on the market today. Through its performance, good design, and great features the Samsung Galaxy S5 deserves to a top phone contender. Although Samsung did not make too many additions from the Samsung Galaxy S4, there are still some key features that are worth taking a look at.', 'The Samsung Galaxy S5 is one of the hottest phones on the market today. Through its performance, good design, and great features the Samsung Galaxy S5 deserves to a top phone contender. Although Samsung did not make too many additions from the Samsung Galaxy S4, there are still some key features that are worth taking a look at.', 17, 5, 200),
(5, 'Samsung Galaxy S4', 'Samsung Galaxy S4 smart phone with 5.00-inch 1080x1920 display powered by 1.6GHz processor alongside 2GB RAM and 13-megapixel rear camera.', 'The Android 5.0.1 Lollipop update is reportedly rolling out over-the-air (OTA) in India, and is said to weigh around 990MB. The update, apart from bringing the Material Design UI of Lollipop, features Samsung''s own TouchWiz interface skinned on top, and brings changes to the notification panel, includes Guest mode, and adds Android Smart Lock, apart from improving overall performance, security and battery life. The start of the rollout of the update was first reported by Sammobile.\n\nThose users who cannot wait for the OTA update to roll out to them, the Android 5.0.1 Lollipop firmware is available on the Samsung Updates website. The unofficial website features both the firmware for Exynos as well as Snapdragon processor variant Samsung Galaxy S4 (GT-I9506).\n\nAndroid 5.0 Lollipop will notably be the third major update for the handset, after Android 4.3 Jelly Bean and Android 4.4 KitKat. The smartphone was launched on March 2013 and later came to India in April. It ran Android 4.2.2 Jelly Bean out-of-the-box.', 18, 5, 159),
(6, 'Samsung Galaxy Tab 2', 'The Samsung Galaxy Tab 2 10.1 was first available for purchase in May 2012.', 'This tablet''s is equipped with a 10.1 inch PLS TFT LCD screen. It has a resolution of 1,280 by 800 pixels. This measures out to 149 PPI pixels-per-inch (PPI), making it a bit dull for a tablet display.\n\nThe Galaxy Tab 2 10.1 also has multimedia features like GPS Navigation, HD Playback, Microphone, and Video Recording.\nThis tablet houses a dual core Texas Instruments OMAP 4430 system on a chip. Its clock speed is 1 GHz, which is slightly slower than average for a tablet processor. With a dual core processor, this tablet will be more effective at multitasking compared to tablets with single core CPUs.\n\nWith 1 GB of RAM, it''s a bit lacking in memory, and will not perform as well as tablets with more RAM.', 19, 6, 287);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `email`, `created`, `enabled`, `image_id`, `role_id`) VALUES
(10, 'customer', '91ec1f9324753048c0096d036a694f86', 'customer@aswat-telecom.com', '2015-02-16 02:06:07', 1, 12, 2),
(11, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin@aswat-telecom.com', '2015-02-16 02:07:07', 1, 13, 3);
