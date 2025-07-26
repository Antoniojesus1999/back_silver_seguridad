import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Clientes } from "./clientes";
import { Propiedades } from "./propiedades";
import { Provincias } from "./provincias";

@Index("municipios_pkey", ["id"], { unique: true })
@Entity("municipios", { schema: "public" })
export class Municipios {
  @Column("integer", { primary: true, name: "id" })
  id?: number;

  @Column("character varying", { name: "nombre", nullable: true, length: 50 })
  nombre?: string | null;

  @OneToMany(() => Clientes, (clientes: Clientes) => clientes.municipio)
  clientes?: Clientes[];

  @ManyToOne(
    () => Provincias,
    (provincias: Provincias): Municipios[] => provincias.municipios ?? [],
  )
  @JoinColumn([{ name: "provincia_id", referencedColumnName: "id" }])
  provincia?: Provincias;

  @OneToMany(
    () => Propiedades,
    (propiedades: Propiedades) => propiedades.municipio,
  )
  propiedades?: Propiedades[];
}
