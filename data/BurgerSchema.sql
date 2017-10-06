DROP DATABASE IF EXISTS `burger`;

Create Database `burger`;
USE `burger`;

Drop Table IF EXISTS `burgers`;

Create Table `burgers` (

	`id` INTEGER(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
	`eaten` BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (`id`)
);

