-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-12-2025 a las 13:51:04
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
-- Estructura de tabla para la tabla `tdispositivo`
--

CREATE TABLE `tdispositivo` (
  `ID_DISPOSITIVO` int(11) NOT NULL,
  `DESCRIPCION` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tdispositivo`
--

INSERT INTO `tdispositivo` (`ID_DISPOSITIVO`, `DESCRIPCION`) VALUES
(1, 'Ordenador'),
(2, 'Tableta'),
(3, 'Teléfono');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tgénero`
--

CREATE TABLE `tgénero` (
  `ID_GENERO` int(11) NOT NULL,
  `DESCRIPCION` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tgénero`
--

INSERT INTO `tgénero` (`ID_GENERO`, `DESCRIPCION`) VALUES
(1, 'Hombre'),
(2, 'Mujer'),
(3, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tobservaciones_facilitador`
--

CREATE TABLE `tobservaciones_facilitador` (
  `ID_OBSERVACION` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `COMENTARIO` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tresultados`
--

CREATE TABLE `tresultados` (
  `ID_RESULTADO` int(11) NOT NULL,
  `ID_USUARIO` int(11) NOT NULL,
  `ID_DISPOSITIVO` int(11) NOT NULL,
  `TIEMPO_SEGUNDOS` int(11) NOT NULL,
  `COMPLETADA` tinyint(1) NOT NULL,
  `COMENTARIOS_USUARIO` text NOT NULL,
  `PROPUESTAS_MEJORA` text NOT NULL,
  `VALORACION` int(11) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tusuarios`
--

CREATE TABLE `tusuarios` (
  `ID` int(11) NOT NULL,
  `PROFESION` varchar(50) NOT NULL,
  `EDAD` int(11) NOT NULL,
  `ID_GENERO` int(11) NOT NULL,
  `PERICIA_INFORMATICA` int(11) NOT NULL
) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tdispositivo`
--
ALTER TABLE `tdispositivo`
  ADD PRIMARY KEY (`ID_DISPOSITIVO`),
  ADD UNIQUE KEY `DESCRIPCION` (`DESCRIPCION`);

--
-- Indices de la tabla `tgénero`
--
ALTER TABLE `tgénero`
  ADD PRIMARY KEY (`ID_GENERO`),
  ADD UNIQUE KEY `DESCRIPCION` (`DESCRIPCION`);

--
-- Indices de la tabla `tobservaciones_facilitador`
--
ALTER TABLE `tobservaciones_facilitador`
  ADD PRIMARY KEY (`ID_OBSERVACION`),
  ADD KEY `fk_obs_usuario` (`ID_USUARIO`);

--
-- Indices de la tabla `tresultados`
--
ALTER TABLE `tresultados`
  ADD PRIMARY KEY (`ID_RESULTADO`),
  ADD KEY `fk_resultado_usuario` (`ID_USUARIO`),
  ADD KEY `fk_resultado_dispositivo` (`ID_DISPOSITIVO`);

--
-- Indices de la tabla `tusuarios`
--
ALTER TABLE `tusuarios`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_usuario_genero` (`ID_GENERO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tdispositivo`
--
ALTER TABLE `tdispositivo`
  MODIFY `ID_DISPOSITIVO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tgénero`
--
ALTER TABLE `tgénero`
  MODIFY `ID_GENERO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tobservaciones_facilitador`
--
ALTER TABLE `tobservaciones_facilitador`
  MODIFY `ID_OBSERVACION` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tresultados`
--
ALTER TABLE `tresultados`
  MODIFY `ID_RESULTADO` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tusuarios`
--
ALTER TABLE `tusuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tobservaciones_facilitador`
--
ALTER TABLE `tobservaciones_facilitador`
  ADD CONSTRAINT `fk_obs_usuario` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tusuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tresultados`
--
ALTER TABLE `tresultados`
  ADD CONSTRAINT `fk_resultado_dispositivo` FOREIGN KEY (`ID_DISPOSITIVO`) REFERENCES `tdispositivo` (`ID_DISPOSITIVO`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_resultado_usuario` FOREIGN KEY (`ID_USUARIO`) REFERENCES `tusuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tusuarios`
--
ALTER TABLE `tusuarios`
  ADD CONSTRAINT `fk_usuario_genero` FOREIGN KEY (`ID_GENERO`) REFERENCES `tgénero` (`ID_GENERO`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
