USE `Project_Freelance_001`;

-- Insert sample data into ShoeType table
INSERT INTO `ShoeType`  (`ShoeTypeName`) VALUES
                        ('Các loại sản phẩm khác'),
                        ('Dép'),
                        ('Sneakers');

-- Insert sample data into Brand table
INSERT INTO `Brand` (`BrandName`, `Logo`) VALUES
                    ('Các thương hiệu khác', 	'default_logo.png'),
                    ('Nike', 					'nike_logo.png'),
                    ('Adidas', 					'adidas_logo.jpg'),
                    ('Puma', 					'puma_logo.png'),
                    ('Converse', 				'converse_logo.png'),
                    ('Vans', 					'vans_logo.png');

-- Insert sample data into Color table
INSERT INTO `Color` (`ColorName`) VALUES
                    ('Đen'),
                    ('Trắng'),
                    ('Đỏ');

       
-- Insert sample data into UserInformation table
INSERT INTO `UserInformation` 	(`Id`, 	`Email`, 				    	`Address`, 				`Birthday`, 		`Fullname`, 		`Gender`,		 `PhoneNumber`) VALUES
								(1, 	'admin@example.com', 			null, 						null, 				null, 				null, 					null);
                              
                        
                        -- Insert sample data into Account table
INSERT INTO `Account` 	(`Id`,	`Password`,														 `Status`, 		`Role`,		`UserInformationId`,	`CreateAt`, 			`Active`) VALUES
						(1,		'$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 	1, 			'Admin',					1,			NOW(),						1);
               


-- Insert sample data into UserInformation table
INSERT INTO `TokenType` 		(`Id`, 	`TokenTypeName`) VALUES
								(1, 	'Registration'),
								(2, 	'UpdatePassword'),
								(3, 	'ResetPassword'),
                                (4, 	'UpdateEmail');
                                



    
    
    
    







