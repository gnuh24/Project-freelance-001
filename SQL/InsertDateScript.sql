USE `Project_Freelance_001`;


-- Insert sample data into ShoeType table
INSERT INTO `ShoeType` 	(`ShoeTypeName`) VALUES
						('Các loại sản phẩm khác'),
						('Dép'),
						('Sneakers'),
						('Vớ');

-- Insert sample data into Brand table
INSERT INTO `Brand` (`BrandName`, 				`Logo`) VALUES
					('Các thương hiệu khác', 	'default_logo.png'),
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
						(1, 50, 150, 70, true),
						(1, 51, 150, 70, false),

                        
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
                        
-- UPDATE Shoe SET DefaultImage = 1 WHERE ShoeId = 1;
-- UPDATE Shoe SET DefaultImage = 10 WHERE ShoeId = 2;
-- UPDATE Shoe SET DefaultImage = 11 WHERE ShoeId = 3;
-- UPDATE Shoe SET DefaultImage = 12 WHERE ShoeId = 4;
-- UPDATE Shoe SET DefaultImage = 13 WHERE ShoeId = 5;
-- UPDATE Shoe SET DefaultImage = 14 WHERE ShoeId = 6;
-- UPDATE Shoe SET DefaultImage = 15 WHERE ShoeId = 7;
-- UPDATE Shoe SET DefaultImage = 16 WHERE ShoeId = 8;
-- UPDATE Shoe SET DefaultImage = 17 WHERE ShoeId = 9;
-- UPDATE Shoe SET DefaultImage = 18 WHERE ShoeId = 10;


       
-- Insert sample data into UserInformation table
INSERT INTO `UserInformation` 	(`Id`, 	`Email`, 				`Address`, 			`Birthday`, 		`Fullname`, 		`Gender`,		 `PhoneNumber`) VALUES
								(1, 	'devilskipper@gmail.com', 	'123 Main St', 		'1990-01-01', 		'John Doe', 		'Male', 		'123-456-7890'),
								(2, 	'admin@example.com', 	'456 Elm St', 		'1985-05-15', 		'Jane Smith', 		'Female', 		'234-567-8901'),
								(3, 	'user2@example.com', 	'789 Maple St', 	'1992-07-20', 		'Alice Johnson', 	'Other', 		'345-678-9012');


                        
                        -- Insert sample data into Account table
INSERT INTO `Account` 	(`Id`,	`Password`,														 `Status`, 		`Role`,		`UserInformationId`,	`CreateAt`, 			`Active`) VALUES
						(1,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	1, 			'User',					1,			'2023-01-01 00:00:00',	1),
						(2,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	1, 			'Admin',				2,			'2024-01-01 00:00:00',  1),
						(3,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	0, 			'User',					3,			'2025-01-01 00:00:00',  1);


-- Insert sample data into UserInformation table
INSERT INTO `TokenType` 		(`Id`, 	`TokenTypeName`) VALUES
								(1, 	'Registration'),
								(2, 	'UpdatePassword'),
								(3, 	'ResetPassword'),
                                (4, 	'UpdateEmail');
                                
INSERT INTO `Voucher` 	(`Title`, 				`Status`, 		`Code`,			 `ExpirationTime`, 		`DiscountAmount`, 		`Condition`, `isFreeShip`) VALUES
						('Summer Sale', 			1, 			'SUMMER2024', 	'2024-08-17 23:59:59', 		50000, 				200000, 				0),
						('Back to School', 			1, 			'SCHOOL2024', 	'2021-09-01 23:59:59', 		30000, 				150000, 				0),
						('Free Shipping Special', 	0, 			'FREESHIP2024', '2024-07-31 23:59:59', 		0, 					0, 						1),
						('Holiday Discount', 		1, 			'HOLIDAY2024', 	'2024-12-31 23:59:59', 		100000, 			300000, 				0),
						('New Year Offer', 			1, 			'NEWYEAR2025', 	'2025-01-15 23:59:59', 		150000, 			500000, 				1);

INSERT INTO `ShippingFee` (`Fee`, `CreateTime`) 
VALUES 
    (50000, '2024-07-18 11:00:00'),
    (60000, '2024-07-19 12:30:00'),
    (70000, '2024-07-20 14:15:00'),
    (80000, '2024-07-21 09:45:00'),
    (90000, '2024-07-22 16:20:00'),
    (100000, '2024-07-23 08:55:00'),
    (110000, '2024-07-24 10:05:00'),
    (120000, '2024-07-25 13:25:00'),
    (130000, '2024-07-26 15:35:00'),
    (140000, '2024-07-27 17:45:00');

-- Insert sample data into the `Order` table
INSERT INTO `Order` (`Id`, `OrderDate`, `TotalPrice`, `SubtotalPrice`, `Note`, `ShippingFeeId`, `Type`, `UserInformationId`, `VoucherId`)
VALUES
('ORD000001', '2023-01-01 09:00:00', 550000, 500000, 'Urgent delivery', 1, 'Web', 1, 1),
('ORD000002', '2023-01-02 10:00:00', 350000, 300000, NULL, 2, 'Facebook', 2, 2),
('ORD000003', '2023-01-03 11:00:00', 750000, 700000, 'Gift wrap', 3, 'Zalo', 3, 1),
('ORD000004', '2023-01-04 12:00:00', 1250000, 1200000, NULL, 1, 'Web', 2, 3),
('ORD000005', '2023-01-05 13:00:00', 500000, 450000, NULL, 2, 'Other', 2, NULL),
('ORD000006', '2023-01-06 14:00:00', 850000, 800000, 'Handle with care', 3, 'Facebook', 1, 2),
('ORD000007', '2023-01-07 15:00:00', 1100000, 1050000, 'Fast delivery', 1, 'Zalo', 2, 3),
('ORD000008', '2023-01-08 16:00:00', 650000, 600000, NULL, 2, 'Web', 1, 1),
('ORD000009', '2023-01-09 17:00:00', 700000, 650000, NULL, 3, 'Other', 3, NULL),
('ORD000010', '2023-01-10 18:00:00', 1500000, 1400000, 'Large order', 1, 'Web', 3, 2);


-- Insert sample data into the `OrderStatus` table
INSERT INTO `OrderStatus` (`OrderId`, `Status`, `UpdateTime`)
VALUES
('ORD000001', 'ChoDuyet', '2023-01-01 10:00:00'),
('ORD000001', 'DaDuyet', '2023-01-02 11:00:00'),
('ORD000001', 'DangGiao', '2023-01-03 12:00:00'),
('ORD000001', 'GiaoThanhCong', '2023-04-01 15:00:00'),

('ORD000002', 'ChoDuyet', '2023-01-02 11:00:00'),
('ORD000002', 'DaDuyet', '2023-01-05 12:00:00'),
('ORD000002', 'Huy', '2023-01-07 14:00:00'),

('ORD000003', 'ChoDuyet', '2023-01-02 12:00:00'),
('ORD000003', 'DaDuyet', '2023-01-05 13:00:00'),
('ORD000003', 'DangGiao', '2023-01-08 15:00:00'),
('ORD000003', 'GiaoThanhCong', '2023-01-12 15:00:00'),

('ORD000004', 'ChoDuyet', '2023-01-04 13:00:00'),
('ORD000004', 'DaDuyet', '2023-01-08 14:00:00'),

('ORD000005', 'ChoDuyet', '2023-01-05 14:00:00'),
('ORD000005', 'Huy', '2023-01-06 16:00:00'),

('ORD000006', 'ChoDuyet', '2023-01-06 15:00:00'),
('ORD000006', 'DaDuyet', '2023-01-08 16:00:00'),
('ORD000006', 'DangGiao', '2023-01-09 18:00:00'),

('ORD000007', 'ChoDuyet', '2023-01-07 16:00:00'),
('ORD000007', 'DaDuyet', '2023-01-08 17:00:00'),
('ORD000007', 'DangGiao', '2023-01-09 19:00:00'),

('ORD000008', 'ChoDuyet', '2023-01-07 16:00:00'),
('ORD000009', 'ChoDuyet', '2023-01-07 16:00:00'),
('ORD000010', 'ChoDuyet', '2023-01-07 16:00:00');


-- Insert sample data into the `OrderDetail` table
INSERT INTO `OrderDetail` (`OrderId`, `ShoeId`, `Size`, `Quantity`, `UnitPrice`, `Total`)
VALUES
('ORD000001', 1, 46, 2, 250000, 500000),
('ORD000001', 2, 47, 1, 50000, 50000),

('ORD000002', 2, 46, 1, 300000, 300000),
('ORD000002', 3, 47, 2, 25000, 50000),

('ORD000003', 4, 46, 3, 400000, 1200000),
('ORD000003', 1, 47, 1, 30000, 30000),

('ORD000004', 3, 46, 1, 450000, 450000),
('ORD000004', 5, 47, 1, 75000, 75000),

('ORD000005', 2, 48, 2, 400000, 800000),

('ORD000006', 6, 46, 1, 600000, 600000),
('ORD000006', 1, 47, 2, 100000, 200000),

('ORD000007', 4, 46, 2, 500000, 1000000),
('ORD000007', 7, 47, 2, 250000, 500000),

('ORD000008', 5, 46, 2, 250000, 500000),

('ORD000009', 1, 47, 1, 500000, 500000),

('ORD000010', 2, 48, 1, 700000, 700000),
('ORD000010', 3, 46, 3, 250000, 750000),
('ORD000010', 4, 47, 2, 100000, 200000);


INSERT INTO `Feedback` (`Title`, `Content`, `CreateTime`, `IsDeleted`, `IsChecked`, `OrderId`) VALUES
    ('Great Service', 'The service was fantastic and fast.', '2023-08-01 10:15:00', FALSE, TRUE, 'ORD000001'),
    ('Not Satisfied', 'The product did not meet my expectations.', '2022-08-02 11:20:00', FALSE, FALSE, 'ORD000001'),
    ('Excellent Quality', 'I am very pleased with the quality of the shoes.', '2023-08-03 09:05:00', FALSE, TRUE, 'ORD000001'),
    ('Quick Delivery', 'Delivery was faster than expected.', '2021-08-04 13:30:00', FALSE, TRUE, 'ORD000002'),
    ('Product Defective', 'Received a defective item, need a replacement.', '2023-08-05 14:45:00', FALSE, FALSE, 'ORD000002'),
    ('Good Value', 'The product is a good value for the price.', '2022-08-06 16:00:00', FALSE, TRUE, 'ORD000002'),
    ('Friendly Support', 'Customer support was very helpful and friendly.', '2021-08-07 17:10:00', FALSE, TRUE, 'ORD000004'),
    ('Shipping Delay', 'There was a delay in shipping, but the product is good.', '2023-08-08 18:25:00', FALSE, FALSE, 'ORD000004'),
    ('Easy to Use', 'The website was easy to navigate and use.', '2022-08-09 19:35:00', FALSE, TRUE, 'ORD000004'),
    ('Will Buy Again', 'I will definitely buy from this store again.', '2021-08-10 20:45:00', FALSE, TRUE, 'ORD000004');

INSERT INTO `FeedbackImage` (`FeedbackId`, `Path`) VALUES
							(1, ":3333"),
                            (1, "path of image2"),
                            (2, "path of image3"),
                            (3, "path of image3");


-- Insert sample data into the InventoryReport table with specific CreateTime values
INSERT INTO `InventoryReport` 	(`Supplier`, 		`SupplierPhone`, 		`TotalPrice`, 		`CreateTime`) VALUES
								('ABC Supplies', 	'123-456-7890', 		15000, 				'2023-08-01 10:00:00'),
								('XYZ Wholesale', 	'987-654-3210',		 	25000,			 	'2023-08-02 11:00:00'),
								('Shoes R Us', 		'456-789-0123', 		30000, 				'2023-08-03 12:00:00'),
								('Global Footwear', '321-654-9870', 		12000, 				'2023-08-04 13:00:00'),
								('Trendsetters', 	'789-012-3456', 		18000, 				'2023-08-05 14:00:00');
                                
INSERT INTO `InventoryReportStatus` (`InventoryReportId`, 	`Status`, 			`UpdateTime`) VALUES
									(1, 					'ChoNhapKho', 		'2023-08-01 10:30:00'),
									(1, 					'DaNhapKho', 		'2023-08-02 09:00:00'),
									(2, 					'ChoNhapKho', 		'2023-08-02 11:30:00'),
									(3, 					'ChoNhapKho', 		'2023-08-03 12:30:00'),
									(4, 					'ChoNhapKho', 		'2023-08-04 13:30:00'),
                                    (5, 					'ChoNhapKho', 		'2023-08-03 12:30:00');

                                    
INSERT INTO `InventoryReportDetail` (`InventoryReportId`, `ShoeId`, `Size`, 	`Quantity`, 	`UnitPrice`, `Total`) VALUES
									(1, 					1, 			45, 			10, 	1000, 			10000),
									(1, 					2, 			44, 			5, 		1000, 			5000),
									(2, 					3, 			44, 			15, 	1200, 			18000),
									(3, 					4, 			44,				20, 	1500, 			30000),
									(3, 					5, 			46, 			10, 	1200, 			12000),
									(4, 					6, 			44, 			8, 		1500, 			12000),
									(5, 					7, 			47, 			12, 	1200, 			14400),
									(5, 					8, 			44, 			8, 		1000, 			8000);



    
    
    
    
INSERT INTO `News` (`Banner`, `Content`, `Title`, `Status`, `PriorityFlag`, `AuthorId`)
VALUES 
('banner1.jpg', 'Content of the first news article.', 'First News Title', 1, 1, 1),
('banner2.jpg', 'Content of the second news article.', 'Second News Title', 1, 0, 2),
('banner3.jpg', 'Content of the third news article.', 'Third News Title', 0, 1, 2),
('banner4.jpg', 'Content of the fourth news article.', 'Fourth News Title', 1, 0, 1),
('banner5.jpg', 'Content of the fifth news article.', 'Fifth News Title', 0, 0, 1);

INSERT INTO `NewsImage` (`Path`, `NewsId`)
VALUES 
('image1.jpg', 1),
('image2.jpg', 1),
('image3.jpg', 2),
('image4.jpg', 3),
('image5.jpg', 3),
('image6.jpg', 4),
('image7.jpg', 5);



