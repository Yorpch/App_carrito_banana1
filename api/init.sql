SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Base de datos: `arduino_ia`

CREATE DATABASE IF NOT EXISTS `arduino_ia` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `arduino_ia`;

-- Estructura de tabla para la tabla `alertas`
CREATE TABLE IF NOT EXISTS `alertas` (
  `id` int(10) UNSIGNED NOT NULL,
  `sesion_id` int(10) UNSIGNED NOT NULL,
  `tipo` enum('colision_evitada','señal_debil','bateria_baja','error_sensor','modelo_actualizado','otro') NOT NULL,
  `descripcion` varchar(255) NOT NULL DEFAULT '',
  `momento` timestamp(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Estructura de tabla para la tabla `dispositivos`
CREATE TABLE IF NOT EXISTS `dispositivos` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL DEFAULT 'Mi Arduino',
  `mac_address` varchar(17) NOT NULL,
  `version_firmware` varchar(20) NOT NULL DEFAULT '1.0',
  `registrado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Estructura de tabla para la tabla `modelo_ia`
CREATE TABLE IF NOT EXISTS `modelo_ia` (
  `id` int(10) UNSIGNED NOT NULL,
  `dispositivo_id` int(10) UNSIGNED NOT NULL,
  `version` varchar(20) NOT NULL,
  `total_decisiones` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `precision_acumulada` float NOT NULL DEFAULT 0,
  `actualizado_en` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Estructura de tabla para la tabla `movimientos`
CREATE TABLE IF NOT EXISTS `movimientos` (
  `id` int(10) UNSIGNED NOT NULL,
  `sesion_id` int(10) UNSIGNED NOT NULL,
  `momento` timestamp(3) NOT NULL DEFAULT current_timestamp(3),
  `sensor_izq_cm` float NOT NULL,
  `sensor_frontal_cm` float NOT NULL,
  `sensor_der_cm` float NOT NULL,
  `valor_binario` float NOT NULL,
  `decision` enum('avanzar','girar_izquierda','girar_derecha','retroceder','detenerse') NOT NULL,
  `angulo_giro` float NOT NULL DEFAULT 0,
  `distancia_cm` float NOT NULL DEFAULT 0,
  `confianza_pct` tinyint(4) NOT NULL DEFAULT 0,
  `tiempo_reaccion_ms` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Estructura de tabla para la tabla `sesiones`
CREATE TABLE IF NOT EXISTS `sesiones` (
  `id` int(10) UNSIGNED NOT NULL,
  `dispositivo_id` int(10) UNSIGNED NOT NULL,
  `inicio` timestamp NOT NULL DEFAULT current_timestamp(),
  `fin` timestamp NULL DEFAULT NULL,
  `distancia_total_cm` float NOT NULL DEFAULT 0,
  `decisiones_tomadas` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `precision_pct` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Estructura de tabla para la tabla `usuarios`
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indices y constraints mínima
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sesion_id` (`sesion_id`);
ALTER TABLE `dispositivos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mac_address` (`mac_address`),
  ADD KEY `usuario_id` (`usuario_id`);
ALTER TABLE `modelo_ia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dispositivo_id` (`dispositivo_id`);
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sesion_momento` (`sesion_id`,`momento`);
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dispositivo_id` (`dispositivo_id`);
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `alertas` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `dispositivos` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `modelo_ia` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `movimientos` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `sesiones` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `usuarios` MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `alertas` ADD CONSTRAINT `alertas_ibfk_1` FOREIGN KEY (`sesion_id`) REFERENCES `sesiones` (`id`) ON DELETE CASCADE;
ALTER TABLE `dispositivos` ADD CONSTRAINT `dispositivos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
ALTER TABLE `modelo_ia` ADD CONSTRAINT `modelo_ia_ibfk_1` FOREIGN KEY (`dispositivo_id`) REFERENCES `dispositivos` (`id`) ON DELETE CASCADE;
ALTER TABLE `movimientos` ADD CONSTRAINT `movimientos_ibfk_1` FOREIGN KEY (`sesion_id`) REFERENCES `sesiones` (`id`) ON DELETE CASCADE;
ALTER TABLE `sesiones` ADD CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`dispositivo_id`) REFERENCES `dispositivos` (`id`) ON DELETE CASCADE;

COMMIT;
