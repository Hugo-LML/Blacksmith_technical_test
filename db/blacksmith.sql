-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 11 mai 2022 à 11:51
-- Version du serveur :  5.7.24
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blacksmith`
--

-- --------------------------------------------------------

--
-- Structure de la table `spaces`
--

CREATE TABLE `spaces` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `stage` int(11) NOT NULL,
  `availability` tinyint(4) NOT NULL DEFAULT '1',
  `occupation_time` int(11) NOT NULL DEFAULT '24',
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `spaces`
--

INSERT INTO `spaces` (`id`, `number`, `stage`, `availability`, `occupation_time`, `user_id`) VALUES
(1, 1, 1, 0, 24, 5),
(2, 2, 1, 0, 24, 17),
(3, 3, 1, 0, 24, 18),
(4, 4, 1, 0, 24, 19),
(5, 5, 1, 1, 24, NULL),
(6, 6, 1, 1, 24, NULL),
(7, 7, 1, 1, 24, NULL),
(8, 8, 1, 1, 24, NULL),
(9, 9, 1, 1, 24, NULL),
(10, 10, 1, 1, 24, NULL),
(12, 11, 2, 1, 24, NULL),
(13, 12, 2, 1, 24, NULL),
(14, 13, 2, 1, 24, NULL),
(15, 14, 2, 1, 24, NULL),
(16, 15, 2, 1, 24, NULL),
(17, 16, 2, 1, 24, NULL),
(18, 17, 2, 1, 24, NULL),
(19, 18, 2, 1, 24, NULL),
(20, 19, 2, 1, 24, NULL),
(21, 20, 2, 1, 24, NULL),
(22, 21, 3, 1, 24, NULL),
(23, 22, 3, 1, 24, NULL),
(24, 23, 3, 1, 24, NULL),
(25, 24, 3, 1, 24, NULL),
(26, 25, 3, 1, 24, NULL),
(27, 26, 3, 1, 24, NULL),
(28, 27, 3, 1, 24, NULL),
(29, 28, 3, 1, 24, NULL),
(30, 29, 3, 1, 24, NULL),
(31, 30, 3, 1, 24, NULL),
(32, 31, 4, 1, 12, NULL),
(33, 32, 4, 1, 12, NULL),
(35, 33, 4, 1, 12, NULL),
(36, 34, 4, 1, 12, NULL),
(37, 35, 4, 1, 12, NULL),
(38, 36, 4, 1, 24, NULL),
(39, 37, 4, 1, 24, NULL),
(40, 38, 4, 1, 12, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `email`, `password`, `admin`) VALUES
(5, 'Hugo', 'Lemerle', '0782536383', 'test1@gmail.com', '$2b$10$tPI3bjkQw9Fd3b7FeoWGgeG5lOm62gimpvFB0/Qki9.c/N6NaMZxm', 0),
(14, 'John', 'Doe', '0123456789', 'testJohn@gmail.com', '$2b$10$Y9rHjWra5qQbKjQdN10ITeRxuKzKimHeAeDqPOlp8WZcfGKpTdk6G', 0),
(17, 'test2', 'test2', '0123456789', 'test2@gmail.com', '$2b$10$K8ud4CgYG0TvJOwozdOKfuOCPOmIIaKyUBypn.NzKsmXalFAuoLy6', 0),
(18, 'admin', 'admin', '0123456789', 'admin@gmail.com', '$2b$10$ykniCNeekZMKvoo8TmC/gubozagUKMA6RXzC6laAxUnonxUDj0MUO', 1),
(19, 'test3', 'test3', '0123456789', 'test3@gmail.com', '$2b$10$ZM5ajYFOHuazwpJSkx1ffuVC06he/YvwozGWGRx09rL06oeFFZAIG', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `spaces`
--
ALTER TABLE `spaces`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `spaces`
--
ALTER TABLE `spaces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `spaces`
--
ALTER TABLE `spaces`
  ADD CONSTRAINT `space_linked_to_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
