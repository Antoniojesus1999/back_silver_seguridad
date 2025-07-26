import { Column, Entity, Index, OneToMany } from "typeorm";

import { Clientes } from "./clientes";
import { Municipios } from "./municipios";
import { Propiedades } from "./propiedades";

@Index("provincias_pkey", ["id"], { unique: true })
@Entity("provincias", { schema: "public" })
export class Provincias {
  @Column("integer", { primary: true, name: "id" })
  id?: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 50 })
  nombre?: string | null;

  @OneToMany(() => Clientes, clientes => clientes.provincia)
  clientes?: Clientes[];

  @OneToMany(() => Municipios, municipios => municipios.provincia)
  municipios?: Municipios[];

  @OneToMany(() => Propiedades, propiedades => propiedades.provincia)
  propiedades?: Propiedades[];
}
