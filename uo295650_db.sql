-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-11-2025 a las 10:01:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `uo295650_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tcomentarios`
--
CREATE TABLE `tcomentarios` (
  `ID_COMENTARIO` int(11) NOT NULL AUTO_INCREMENT,
  `ID_USER` int(11) NOT NULL,
  `COMENTARIOS` text NOT NULL,
  PRIMARY KEY (`ID_COMENTARIO`),
  KEY `fk_com_user` (`ID_USER`),
  CONSTRAINT `fk_com_user` FOREIGN KEY (`ID_USER`) REFERENCES `tusuarios` (`ID`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tresultados`
--
CREATE TABLE `tresultados` (
  `ID_RESULTADO` int(11) NOT NULL AUTO_INCREMENT,
  `ID_USER` int(11) NOT NULL,
  `DISPOSITIVO` enum('ORDENADOR','TABLETA','TELEFONO') NOT NULL,
  `TIEMPO` time NOT NULL,
  `COMPLETADA` tinyint(1) NOT NULL,
  `COMENTARIO` text NOT NULL,
  `PROPUESTAS` text NOT NULL,
  `VALORACION` int(11) NOT NULL,
  PRIMARY KEY (`ID_RESULTADO`),
  KEY `fk_res_user` (`ID_USER`),
  CONSTRAINT `fk_res_user` FOREIGN KEY (`ID_USER`) REFERENCES `tusuarios` (`ID`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_valoracion` CHECK (`VALORACION` BETWEEN 0 AND 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tusuarios`
--

CREATE TABLE `tusuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PROFESION` varchar(50) NOT NULL,
  `EDAD` int(11) NOT NULL,
  `GENERO` enum('H','M') NOT NULL,
  `PERICIA_INFORMATICA` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;






--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tusuarios`
--
ALTER TABLE `tusuarios`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tusuarios`
--
ALTER TABLE `tusuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
