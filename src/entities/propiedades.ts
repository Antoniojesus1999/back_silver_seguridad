import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

import { Clientes } from "./clientes";
import { Instalaciones } from "./instalaciones";
import { Municipios } from "./municipios";
import { Provincias } from "./provincias";

@Index("propiedades_pkey", ["id"], { unique: true })
@Index("propiedades_instalacion_id_key", ["instalacionId"], { unique: true })
@Entity("propiedades", { schema: "public" })
export class Propiedades {
  @Column("integer", { primary: true, name: "id" })
  id?: number;

  @Column("integer", { name: "instalacion_id", nullable: true, unique: true })
  instalacionId?: number | null;

  @Column("character", { name: "tipo", nullable: true, length: 1 })
  tipo?: string | null;

  @Column("character varying", {
    name: "direcc_via",
    nullable: true,
    length: 50,
  })
  direccVia?: string | null;

  @Column("character varying", {
    name: "direcc_num",
    nullable: true,
    length: 3,
  })
  direccNum?: string | null;

  @Column("character varying", {
    name: "direcc_aux",
    nullable: true,
    length: 20,
  })
  direccAux?: string | null;

  @Column("character varying", { name: "direcc_cp", nullable: true, length: 5 })
  direccCp?: string | null;

  @ManyToOne(() => Clientes, (clientes: Clientes) => clientes.propiedades)
  @JoinColumn([{ name: "cliente_id", referencedColumnName: "id" }])
  cliente?: Clientes;

  @OneToOne(() => Instalaciones, instalaciones => instalaciones.propiedades)
  @JoinColumn([{ name: "instalacion_id", referencedColumnName: "id" }])
  instalacion?: Instalaciones;

  @ManyToOne(() => Municipios, municipios => municipios.propiedades)
  @JoinColumn([{ name: "municipio_id", referencedColumnName: "id" }])
  municipio?: Municipios;

  @ManyToOne(() => Provincias, provincias => provincias.propiedades)
  @JoinColumn([{ name: "provincia_id", referencedColumnName: "id" }])
  provincia?: Provincias;
}
