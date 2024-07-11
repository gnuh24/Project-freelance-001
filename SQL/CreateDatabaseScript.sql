DROP DATABASE IF EXISTS `Project_Freelance_001`;
CREATE DATABASE IF NOT EXISTS `Project_Freelance_001`;
USE `Project_Freelance_001`;

DROP TABLE IF EXISTS `ShoeType`;
CREATE TABLE IF NOT EXISTS `ShoeType`(
	`ShoeTypeId` 	TINYINT UNSIGNED 	PRIMARY KEY 	AUTO_INCREMENT,
    `ShoeTypeName` 	NVARCHAR(255) 						NOT NULL,
    `Status`		BOOLEAN								NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `ShoeColor`;
CREATE TABLE IF NOT EXISTS `ShoeColor`(
	`ShoeColorId` 		TINYINT UNSIGNED 	PRIMARY KEY 	AUTO_INCREMENT,
    `ShoeColorName` 	NVARCHAR(255) 						NOT NULL,
	`Status`			BOOLEAN								NOT NULL	DEFAULT 1
);

DROP TABLE IF EXISTS `Brand`;
CREATE TABLE IF NOT EXISTS `Brand`(
	`BrandId` 		TINYINT UNSIGNED 	PRIMARY KEY 	AUTO_INCREMENT,
    `BrandName` 	NVARCHAR(255) 						NOT NULL,
    `Logo`			NVARCHAR(255)						NOT NULL,
	`Status`		BOOLEAN								NOT NULL		DEFAULT 1
);



DROP TABLE IF EXISTS `Shoe`;
CREATE TABLE IF NOT EXISTS `Shoe`(
	`ShoeId`		SMALLINT UNSIGNED	PRIMARY KEY 	AUTO_INCREMENT	,
    `ShoeName`		NVARCHAR(255)		NOT NULL						,
    `Status`		BOOLEAN				NOT NULL		DEFAULT 0		,
    `CreateDate`	DATETIME			NOT NULL		DEFAULT	NOW()	,
    `Priority`		BOOLEAN				NOT NULL 		DEFAULT 0		,
    `Description`	TEXT												,
    `BrandId`		TINYINT UNSIGNED	NOT NULL		DEFAULT 1		,
    `ShoeTypeId`	TINYINT UNSIGNED	NOT NULL		DEFAULT 1		,
	`ShoeColorId`	TINYINT UNSIGNED	NOT NULL		DEFAULT 1		,

    FOREIGN KEY (`BrandId`) 	REFERENCES	`Brand`(`BrandId`)			,
	FOREIGN KEY (`ShoeTypeId`) 	REFERENCES `ShoeType`(`ShoeTypeId`)		,
	FOREIGN KEY (`ShoeColorId`) 	REFERENCES `ShoeColor`(`ShoeColorId`)				

);

DROP TABLE IF EXISTS `ShoeSize`;
CREATE TABLE IF NOT EXISTS `ShoeSize`(
	`ShoeId`		SMALLINT UNSIGNED									,
    `Size`			TINYINT UNSIGNED									,
    `Price`			INT UNSIGNED		NOT NULL		DEFAULT 0		,
    `Quanlity`		SMALLINT UNSIGNED	NOT NULL		DEFAULT 0		,
	`Status`		BOOLEAN	NOT NULL					DEFAULT 1		,

    
    FOREIGN KEY (`ShoeId`) 	REFERENCES	`Shoe`(`ShoeId`)				,
    PRIMARY KEY (`ShoeId`, `Size`)	
);

DROP TABLE IF EXISTS `ShoeImage`;
CREATE TABLE IF NOT EXISTS `ShoeImage`(
	`ShoeImageId`	SMALLINT UNSIGNED	PRIMARY KEY 	AUTO_INCREMENT	,
    `Path`			NVARCHAR(255) 		NOT NULL						,
    `Priority`		BOOLEAN				NOT NULL		DEFAULT 0		,
	`ShoeId`		SMALLINT UNSIGNED	NOT NULL						,

    FOREIGN KEY (`ShoeId`) 	REFERENCES	`Shoe`(`ShoeId`)				
);




DROP TABLE IF EXISTS `Account`;
CREATE TABLE IF NOT EXISTS `Account`(
	`Id`			INT UNSIGNED		PRIMARY KEY 	AUTO_INCREMENT	,
    `Password`		NVARCHAR(800) 		NOT NULL						,
    `CreateAt`		DATETIME			NOT NULL		DEFAULT NOW()	,
    `Status`		BOOLEAN 			NOT NULL 		DEFAULT 0		,
    `Role`			ENUM("User", "Admin")	NOT NULL 	DEFAULT "User"	
);

DROP TABLE IF EXISTS `UserInformation`;
CREATE TABLE IF NOT EXISTS `UserInformation`(
	`Id`			INT UNSIGNED		PRIMARY KEY 					,
    `Email`			NVARCHAR(255) 		NOT NULL 		UNIQUE			,
	`Address`		NVARCHAR(255)										,
    `Birthday`		DATE												,
    `Fullname`		NVARCHAR(255)										,
	`Gender`		ENUM("Male", "Female", "Other")						,
    `PhoneNumber`	NVARCHAR(20)										,
	FOREIGN KEY (`Id`) REFERENCES `Account`(`Id`)
);

DROP TABLE IF EXISTS `TokenType`;
CREATE TABLE IF NOT EXISTS `TokenType`(
	`Id`					INT UNSIGNED		PRIMARY KEY  	AUTO_INCREMENT	,
	`TokenTypeName`			NVARCHAR(255) 		NOT NULL 		UNIQUE			
);

DROP TABLE IF EXISTS `Token`;
CREATE TABLE IF NOT EXISTS `Token`(
	`Id`			INT UNSIGNED		PRIMARY KEY  AUTO_INCREMENT	,
	`Token`			CHAR(36) 			NOT NULL 	UNIQUE			,
    `Expiration`	DATETIME 			NOT NULL					,
	`TokenTypeId`	INT UNSIGNED	NOT NULL						,
	`AccountId` 	INT UNSIGNED 		NOT NULL					,
	FOREIGN KEY (`TokenTypeId`) REFERENCES `TokenType`(`Id`),
	FOREIGN KEY (`AccountId`) REFERENCES `Account`(`Id`)
);