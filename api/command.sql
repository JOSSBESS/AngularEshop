CREATE TABLE users
(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
email VARCHAR(100),
name  VARCHAR(100),
password VARCHAR(255),
role VARCHAR(20)
);

CREATE TABLE products
(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
productname VARCHAR(50),
productdescription TEXT,
productprice DOUBLE,
productimg VARCHAR(50)
);

INSERT INTO products (productname, productdescription, productprice, productimg)
VALUES (product1, "it's the product1", 4,52, assets/products/blue.png)

CREATE TABLE bucket
(
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
productid INT,
userid INT,
purchased INT
);

INSERT INTO bucket (userid, productid, purchased)
VALUES (0,0,0);

UPDATE users set role='admin' where id=x;

select bucket.productid, products.productname, products.productprice
FROM products ,bucket
WHERE products.id = bucket.productid
AND bucket.userid = ?;

select 