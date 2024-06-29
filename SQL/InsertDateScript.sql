USE `Project_Freelance_001`;


-- Insert sample data into ShoeType table
INSERT INTO `ShoeType` 	(`ShoeTypeName`) VALUES
						('Các loại giày khác'),
						('Sneakers'),
						('Boots'),
						('Sandals'),
						('Loafers'),
						('Formal'),
						('Slippers'),
						('Athletic'),
						('Casual'),
						('Dress'),
						('Flip Flops');

-- Insert sample data into Brand table
INSERT INTO `Brand` (`BrandName`, 				`Logo`) VALUES
					('Các thương hiệu khác', 	'Sample :33'),
					('Nike', 					'nike_logo.png'),
					('Adidas', 					'adidas_logo.png'),
					('Puma', 					'puma_logo.png'),
					('Reebok', 					'reebok_logo.png'),
					('Under Armour',			'underarmour_logo.png'),
					('New Balance', 			'newbalance_logo.png'),
					('Asics', 					'asics_logo.png'),
					('Converse', 				'converse_logo.png'),
					('Vans', 					'vans_logo.png'),
					('Skechers', 				'skechers_logo.png');

-- Insert sample data into Shoe table
INSERT INTO `Shoe` 	(`ShoeName`, 						`Color`, 	`Status`, 	`Priority`, 	`Description`, 							`BrandId`, 		`ShoeTypeId`) VALUES
					('Nike Air Max', 					'Red', 		TRUE, 		FALSE, 			'A popular sneaker from Nike', 			1, 							1),
					('Adidas Ultra Boost', 				'Black', 	TRUE, 		TRUE, 			'Comfortable and stylish sneakers', 	2, 							2),
					('Puma Suede Classic ', 			'Blue', 	TRUE, 		FALSE, 			'Classic design with modern twist', 	2, 							2),
					('Reebok Classic',					'White', 	FALSE, 		FALSE, 			'Timeless design with comfort', 		4, 							2),
					('Under Armour HOVR', 				'Grey', 	TRUE, 		FALSE, 			'High performance running shoes', 		6, 							3),
					('New Balance 574', 				'Green', 	TRUE, 		FALSE, 			'Retro style with modern comfort', 		6, 							3),
					('Asics Gel-Kayano', 				'Black', 	TRUE, 		FALSE, 			'High stability running shoes', 		6, 							4),
					('Converse Chuck Taylor', 			'White', 	FALSE, 		TRUE, 			'Iconic high-top sneakers', 			8, 							4),
					('Vans Old Skool', 					'Black', 	TRUE, 		FALSE, 			'Classic skate shoes', 					8, 							5),
					('Skechers D\'Lites', 				'White', 	TRUE, 		TRUE, 			'Comfortable and casual', 			   10, 							7);
                    
-- Insert sample data into ShoeSize table
INSERT INTO `ShoeSize` (`ShoeId`, `Size`, `Price`, `Quanlity`) VALUES
						(1, 38, 120, 50),
						(1, 39, 120, 40),
						(1, 40, 120, 60),
						(2, 38, 150, 30),
						(2, 39, 150, 20),
						(2, 40, 150, 50),
						(3, 37, 100, 25),
						(3, 38, 100, 30),
						(3, 39, 100, 35),
						(4, 40, 130, 40),
						(4, 41, 130, 20),
						(4, 42, 130, 50),
						(5, 39, 140, 15),
						(5, 40, 140, 25),
						(5, 41, 140, 35),
						(6, 38, 110, 40),
						(6, 39, 110, 45),
						(6, 40, 110, 50),
						(7, 40, 160, 10),
						(7, 41, 160, 15),
						(7, 42, 160, 20),
						(8, 39, 130, 50),
						(8, 40, 130, 60),
						(8, 41, 130, 40),
						(9, 38, 140, 35),
						(9, 39, 140, 25),
						(9, 40, 140, 20),
						(10, 40, 120, 30),
						(10, 41, 120, 40),
						(10, 42, 120, 50),
						(10, 43, 120, 50),
						(10, 44, 150, 50),
						(10, 45, 160, 50);

-- Insert sample data into ShoeImage table
INSERT INTO `ShoeImage` (`Path`, 								`Priority`, `ShoeId`) VALUES
						('images/nike_air_max_1.jpg', 			1, 					1),
						('images/nike_air_max_2.jpg', 			0, 					1),
						('images/adidas_ultra_boost_1.jpg', 	1, 					2),
						('images/adidas_ultra_boost_2.jpg', 	0, 					2),
						('images/puma_suede_classic_1.jpg', 	1, 					3),
						('images/puma_suede_classic_2.jpg', 	0, 					3),
						('images/reebok_classic_1.jpg', 		1, 					4),
						('images/reebok_classic_2.jpg', 		0, 					4),
						('images/under_armour_hovr_1.jpg', 		1, 					5),
						('images/under_armour_hovr_2.jpg', 		0, 					5),
						('images/new_balance_574_1.jpg', 		1, 					6),
						('images/new_balance_574_2.jpg', 		0, 					6),
						('images/asics_gel_kayano_1.jpg', 		1, 					7),
						('images/asics_gel_kayano_2.jpg', 		0, 					7),
						('images/converse_chuck_taylor_1.jpg', 	1, 					8),
						('images/converse_chuck_taylor_2.jpg', 	0, 					8),
						('images/vans_old_skool_1.jpg', 		1, 					9),
						('images/vans_old_skool_2.jpg', 		0, 					9),
						('images/skechers_dlites_1.jpg', 		1, 				   10),
						('images/skechers_dlites_2.jpg', 		0,				   10);