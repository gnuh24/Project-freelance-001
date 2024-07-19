USE `Project_Freelance_001`;


-- Insert sample data into ShoeType table
INSERT INTO `ShoeType` 	(`ShoeTypeName`) VALUES
						('Dép'),
						('Sneakers'),
						('Vớ');

-- Insert sample data into Brand table
INSERT INTO `Brand` (`BrandName`, 				`Logo`) VALUES
					('Nike', 					'nike_logo.png'),
					('Adidas', 					'adidas_logo.jpg'),
					('Puma', 					'puma_logo.png'),
					('Reebok', 					'reebok_logo.png'),
					('Under Armour',			'underarmour_logo.png'),
					('New Balance', 			'newbalance_logo.png'),
					('Asics', 					'asics_logo.png'),
					('Converse', 				'converse_logo.png'),
					('Vans', 					'vans_logo.png'),
					('Skechers', 				'skechers_logo.png');
                    
INSERT INTO `Color` (`ColorName`) VALUES
						('Đen'),
                        ('Trắng'),
						('Đỏ'),
						('Xám');

-- Insert sample data into Shoe table
INSERT INTO `Shoe` 	(`ShoeId`,	`ShoeName`, 																															`Status`, 		`Priority`, 		`Description`, 						`BrandId`, 		`ShoeTypeId`,			`CreateDate`				) VALUES
					(1,			'[BIG SIZE 44-50] Dép Quai Ngang Size Lớn Big Size Das Đúc Black Ba Sọc Giày Dép Lê Size Lớn Ngoại Cỡ 44 45 46 47', 					TRUE, 				FALSE, 			'Mô tả cho dép Adidas', 			2, 					1,					'2024-07-03 10:00:00'		),
					(2,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Đỏ Cổ Đen Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 	TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(3,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Đen Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 			TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(4,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Cổ Đỏ Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 		TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(5,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Đen Đỏ Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 				TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(6,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Tinh Khiết Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 	TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(7,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Xám Trắng Kem Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 		TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(8,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Trắng Đỏ Đủ Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 			TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(9,			'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Xám Trắng Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 				TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		),
					(10,		'[BIG SIZE 44-50] Giày Size Lớn Big Size NK JD LOW Xám Trắng Đen Phối Màu Giày Dép Sneaker Thể Thao Ngoại Cỡ 44 45 46 47 48 ', 			TRUE, 				FALSE, 			'Mô tả cho giày Nike', 				1, 					2,					'2024-07-02 10:00:00'		);

                    
                    
                    
                    
INSERT INTO `ShoeColor`(`ColorId`, `ShoeId`)
VALUES					(1,				1),  
						(2,				1),

						(2,				2),
						(3,				2),

						(1,				3),
						(2,				3),

						(2,				4),
						(3,				4),

						(1,				5),
						(2,				5),
						(3,				5),

						(2,				6),

						(2,				7),
						(4,				7),

						(2,				8),
						(3,				8),

						(2,				9),
						(4,				9),

						(1,				10),
						(2,				10),
                        (4,				10);


        
-- Insert sample data into ShoeSize table
INSERT INTO `ShoeSize` (`ShoeId`, `Size`, `Price`, `Quanlity`, `Status`) VALUES
						(1, 44, 120, 100, true),
						(1, 45, 130, 90, true),
						(1, 46, 140, 80, false),
                        (1, 47, 150, 70, true),
                        
                        (2, 44, 120, 100, true),
						(2, 45, 130, 90, true),
						(2, 46, 140, 80, false),
                        (2, 47, 150, 70, true),
                        (2, 48, 120, 0, true),
                        
						(3, 44, 120, 100, true),
						(3, 45, 130, 90, true),
						(3, 46, 140, 80, false),
                        (3, 47, 150, 70, true),
                        (3, 48, 120, 0, true),
                        
                        (4, 44, 120, 100, true),
						(4, 45, 130, 90, true),
						(4, 46, 140, 80, false),
                        (4, 47, 150, 70, true),
                        (4, 48, 120, 0, true),
                        
                        (5, 44, 120, 100, true),
						(5, 45, 130, 90, true),
						(5, 46, 140, 80, false),
                        (5, 47, 150, 70, true),
                        (5, 48, 120, 0, true),
                        
                        (6, 44, 120, 100, true),
						(6, 45, 130, 90, true),
						(6, 46, 140, 80, false),
                        (6, 47, 150, 70, true),
                        (6, 48, 120, 0, true),
                        
                        (7, 44, 120, 100, true),
						(7, 45, 130, 90, true),
						(7, 46, 140, 80, false),
                        (7, 47, 150, 70, true),
                        (7, 48, 120, 0, true),

                        (8, 44, 120, 100, true),
						(8, 45, 130, 90, true),
						(8, 46, 140, 80, false),
                        (8, 47, 150, 70, true),
                        (8, 48, 120, 0, true),
                        
                        (9, 44, 120, 100, true),
						(9, 45, 130, 90, true),
						(9, 46, 140, 80, false),
                        (9, 47, 150, 70, true),
                        (9, 48, 120, 0, true),
                        
                        (10, 44, 120, 100, true),
						(10, 45, 130, 90, true),
						(10, 46, 140, 80, false),
                        (10, 47, 150, 70, true),
                        (10, 48, 120, 0, true);

					

-- Insert sample data into ShoeImage table
INSERT INTO `ShoeImage` (`Path`, 														`Priority`, 		`ShoeId`) VALUES
						('z5641604839718_1b17a65b71e63eac7737450946213a3a.jpg', 			1, 					1),
						('z5641604868114_ddcc81c7ef914bf0b7c38680f71ef38d.jpg', 			0, 					1),
                        ('z5641604897479_6c36144752689e5279da3e34a35c0f88.jpg', 			0, 					1),
						('z5641604925586_1753f58e992f63fedad8b7e79ccbefd8.jpg', 			0, 					1),
						('z5641604925695_abb604957d35f9ceb4a63c3ebc8e159e.jpg', 			0, 					1),
						('z5641604954074_c43979e5b3376df06735cedd68bdcb62.jpg', 			0, 					1),
						('z5641605012421_5b8e80ebda929508b617f58290bb29e0.jpg', 			0, 					1),
						('z5641605012586_7b439585b09619e1a4d35a96c3f71549.jpg', 			0, 					1),
						('z5641605042121_5c2313e19f76ee55fbe20c26174e88ed.jpg', 			0, 					1),
                        
                        ('z5641519946609_4532d0a2c0c0e8b27015a02bca200d21.jpg', 			1, 					2),


						('z5641519946725_1340f0e2b247520f9eb2fb568cc1c0bd.jpg', 			1, 					3),


						('z5641519989234_8b4778c5e894e08e44b028359ac7ba47.jpg', 			1, 					4),


						('z5641519989335_9e76c37753d22f3d545b85a33241fbb4.jpg', 			1, 					5),


						('z5641520032581_d39a663d8b2a9d79feba57adbebcc1cb.jpg', 			1, 					6),


						('z5641520076699_d056761c7e4c9465abe2ac3db63af8d5.jpg', 			1, 					7),


						('z5641520076828_d590b118da42bceca35961b3973a4539.jpg', 			1, 					8),

						('z5641520119202_631f638eaaca555ab71fec27240a87a3.jpg', 			1, 					9),


						('z5641520162272_a570750742b5094e8c77cebebe48c517.jpg', 			1, 					10);

       
-- Insert sample data into UserInformation table
INSERT INTO `UserInformation` 	(`Id`, 	`Email`, 				`Address`, 			`Birthday`, 		`Fullname`, 		`Gender`,		 `PhoneNumber`) VALUES
								(1, 	'user1@example.com', 	'123 Main St', 		'1990-01-01', 		'John Doe', 		'Male', 		'123-456-7890'),
								(2, 	'admin@example.com', 	'456 Elm St', 		'1985-05-15', 		'Jane Smith', 		'Female', 		'234-567-8901'),
								(3, 	'user2@example.com', 	'789 Maple St', 	'1992-07-20', 		'Alice Johnson', 	'Other', 		'345-678-9012');


                        
                        -- Insert sample data into Account table
INSERT INTO `Account` 	(`Id`,	`Password`,														 `Status`, 	`Role`,	`UserInformationId`) VALUES
						(1,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	1, 			'User',					1),
						(2,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	1, 			'Admin',				2),
						(3,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	0, 			'User',					3);


-- Insert sample data into UserInformation table
INSERT INTO `TokenType` 		(`Id`, 	`TokenTypeName`) VALUES
								(1, 	'Registration'),
								(2, 	'ResetPassword'),
								(3, 	'LoginAdmin');
                                
INSERT INTO `Voucher` 	(`Title`, 				`Status`, 		`Code`,			 `ExpirationTime`, 		`DiscountAmount`, 		`Condition`, `isFreeShip`) VALUES
						('Summer Sale', 			1, 			'SUMMER2024', 	'2024-08-17 23:59:59', 		50000, 				200000, 				0),
						('Back to School', 			1, 			'SCHOOL2024', 	'2021-09-01 23:59:59', 		30000, 				150000, 				0),
						('Free Shipping Special', 	0, 			'FREESHIP2024', '2024-07-31 23:59:59', 		0, 					0, 						1),
						('Holiday Discount', 		1, 			'HOLIDAY2024', 	'2024-12-31 23:59:59', 		100000, 			300000, 				0),
						('New Year Offer', 			1, 			'NEWYEAR2025', 	'2025-01-15 23:59:59', 		150000, 			500000, 				1);

INSERT INTO `ShippingFee` (`Fee`, `CreateTime`) VALUES (40000, '2024-07-17 10:00:00');

