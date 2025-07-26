CREATE TABLE personas (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  apellido1 VARCHAR(50),
  apellido2 VARCHAR(50),
  nif_nie VARCHAR(10),
  telefono VARCHAR(12),
  email VARCHAR(50)
);

CREATE TABLE provincias (
  id INTEGER PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE municipios (
  id INTEGER PRIMARY KEY,
  nombre VARCHAR(50),
  provincia_id INTEGER NOT NULL,
  FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

CREATE TABLE clientes (
  id BIGSERIAL PRIMARY KEY,
  persona_id BIGINT UNIQUE,
  direcc_via VARCHAR(50),
  direcc_num VARCHAR(3),
  direcc_aux VARCHAR(20),
  direcc_cp VARCHAR(5),
  municipio_id INTEGER,
  provincia_id INTEGER,
  num_cliente_silver BIGINT UNIQUE,
  abonado_cra BOOLEAN,
  num_policia_nac INTEGER UNIQUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (persona_id) REFERENCES personas(id),
  FOREIGN KEY (municipio_id) REFERENCES municipios(id),
  FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

CREATE TABLE instalaciones (
  id BIGSERIAL PRIMARY KEY,
  cliente_id BIGINT,
  tipo CHAR(1),
  precio NUMERIC(9,2),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE contratos (
  id INTEGER PRIMARY KEY,
  instalacion_id INTEGER UNIQUE,
  tipo CHAR(1),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (instalacion_id) REFERENCES instalaciones(id)
);

CREATE TABLE instalaciones_personas (
  instalacion_id BIGINT,
  persona_id BIGINT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (instalacion_id, persona_id),
  FOREIGN KEY (instalacion_id) REFERENCES instalaciones(id),
  FOREIGN KEY (persona_id) REFERENCES personas(id)
);

CREATE TABLE propiedades (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER,
  instalacion_id INTEGER UNIQUE,
  tipo CHAR(1),
  direcc_via VARCHAR(50),
  direcc_num VARCHAR(3),
  direcc_aux VARCHAR(20),
  direcc_cp VARCHAR(5),
  municipio_id INTEGER,
  provincia_id INTEGER,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (instalacion_id) REFERENCES instalaciones(id),
  FOREIGN KEY (municipio_id) REFERENCES municipios(id),
  FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);
