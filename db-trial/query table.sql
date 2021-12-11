create table customers(
   ID INT NOT NULL AUTO_INCREMENT,
   customer_name VARCHAR(100) NOT NULL,
   email VARCHAR(40) NOT NULL,
   pass VARCHAR(40) NOT NULL,
   wallet INT zerofill,
   PRIMARY KEY ( ID )
);
create table staff(
   ID INT NOT NULL AUTO_INCREMENT,
   customer_name VARCHAR(100) NOT NULL,
   email VARCHAR(40) NOT NULL,
   pass VARCHAR(40) NOT NULL,
   designation INT NOT NULL,
   PRIMARY KEY ( ID )
);