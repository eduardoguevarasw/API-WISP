CREATE DATABASE IF NOT EXISTS db_cybermovil;
USE db_cybermovil;


CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contraseña VARCHAR(50) NOT NULL,
    estado BOOLEAN NOT NULL
);

--crear tabla de clientes con  id | create_time | nombre | apellido | telefono  | direccion | estado | cedula 
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    estado BOOLEAN NOT NULL,
    cedula VARCHAR(50) NOT NULL
);

--insertar un clientes por defecto 
INSERT INTO clientes (nombre, apellido, telefono, direccion, estado, cedula) VALUES ('admin', 'admin', '999999', 'tiputini', true, '0999999999');


CREATE TABLE Pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha_pago DATE NOT NULL,
    monto_pagado DECIMAL(10,2) NOT NULL,
    meses_pagados INT,
    num_referencia VARCHAR(50),
    nombre_banco VARCHAR(100),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

--insertar un pago por defecto
INSERT INTO Pagos (id_cliente, fecha_pago, monto_pagado, meses_pagados, num_referencia, nombre_banco) VALUES (2, '2021-09-01', 10.00, 1, '123456789', 'Banco Pichincha');


--eliminar columna meses_pagados
ALTER TABLE Pagos DROP COLUMN meses_pagados;

--eliminar con trunca la tabla de pagos


--eliminar la tabla de clientes
DROP TABLE clientes;

--insertar un usuario por defecto
INSERT INTO usuarios (usuario, contraseña, estado) VALUES ('admin', 'admin', true);

--añadir una columna a la tabla de clientes el campo cedula
ALTER TABLE clientes ADD COLUMN cedula VARCHAR(50) NOT NULL;


--esta es mi tabla de facturas
-- +-------------------+-------------+------+-----+-------------------+-------------------+
-- | Field             | Type        | Null | Key | Default           | Extra             |
-- +-------------------+-------------+------+-----+-------------------+-------------------+
-- | id                | int         | NO   | PRI | NULL              | auto_increment    |
-- | numero_factura    | varchar(50) | NO   |     | NULL              |                   |
-- | id_cliente        | int         | NO   | MUL | NULL              |                   |
-- | fecha_factura     | date        | NO   |     | NULL              |                   |
-- | fecha_vencimiento | date        | NO   |     | NULL              |                   |
-- | detalle           | text        | NO   |     | NULL              |                   |
-- | cantidad          | double      | YES  |     | NULL              |                   |
-- | observacion       | text        | YES  |     | NULL              |                   |
-- | fecha_creacion    | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
-- | estado_pagada     | tinyint(1)  | NO   |     | 0                 |                   |
-- +-------------------+-------------+------+-----+-------------------+-------------------+

--crea una tabla llamada pagos donde tenga id autoincrementable, id_cliente(foranea de la tabla clientes), fecha_pago, valor, id_factura (foranea de la tabla facturas), observaciones

CREATE TABLE pagos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    fecha_pago DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    id_factura INT,
    observaciones TEXT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id),
    FOREIGN KEY (id_factura) REFERENCES factura(id)
);