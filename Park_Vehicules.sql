CREATE TABLE `controle`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `etat` ENUM('courant','archivé') NOT NULL,
    `date_début` DATE NOT NULL,
    `date_fin` DATE NOT NULL,
    `date_payement` DATE NOT NULL,
    `organisme` VARCHAR(255) NULL,
    `montant` BIGINT NULL,
    `police` VARCHAR(255) NOT NULL,
    `id-v` BIGINT NOT NULL,
    `type_controle` ENUM('assurance','scanner','controle interne externe','repreuve','carte rouge') NOT NULL,
    `num_pv` BIGINT NULL,
    `numero_carte_rouge` BIGINT NULL ,
    
);
CREATE TABLE `moyens_transport`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `cds` ENUM('CE 201 SAIDA','MCE 293 MASCARA','MCE 202 EL BAYADH') NOT NULL,
    `district` BIGINT NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `matricule` BIGINT NOT NULL,
    `num_chassis` BIGINT NOT NULL,
    `année_service` DATE NOT NULL,
    `poids` BIGINT NOT NULL,
    `energie` ENUM('essence','gazoile','gplc','propane') NOT NULL,
    `marque` VARCHAR(255) NOT NULL,
    `type_v` VARCHAR(255) NOT NULL,
    `type_moyen` ENUM('Tracteur routier','camion porte pallete','camions citerne','semi remarque citerne','semi remarque porte pallete','vehicule leger','chariot elevateur') NOT NULL
);
CREATE TABLE `Users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nom` VARCHAR(255) NOT NULL,
    `Prénom` VARCHAR(255) NOT NULL,
    `departement` varchar(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `Role` ENUM('admin','consulteur','createur') NOT NULL,
    `cds` ENUM() NOT NULL
);
ALTER TABLE
    `controle` ADD CONSTRAINT `controle_id_v_foreign` FOREIGN KEY(`id-v`) REFERENCES `moyens_transport`(`id`);
