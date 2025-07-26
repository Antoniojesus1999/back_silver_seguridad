import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Instalaciones } from "./instalaciones";
import { Municipios } from "./municipios";
import { Personas } from "./personas";
import { Propiedades } from "./propiedades";
import { Provincias } from "./provincias";

@Index("clientes_pkey", ["id"], { unique: true })
@Index("clientes_num_cliente_silver_key", ["numClienteSilver"], {
  unique: true,
})
@Index("clientes_num_policia_nac_key", ["numPoliciaNac"], { unique: true })
@Index("clientes_persona_id_key", ["personaId"], { unique: true })
@Entity("clientes", { schema: "public" })
export class Clientes {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("bigint", { name: "persona_id", nullable: true, unique: true })
  personaId?: string | null;

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

  @Column("bigint", {
    name: "num_cliente_silver",
    nullable: true,
    unique: true,
  })
  numClienteSilver?: string | null;

  @Column("boolean", { name: "abonado_cra", nullable: true })
  abonadoCra?: boolean | null;

  @Column("integer", { name: "num_policia_nac", nullable: true, unique: true })
  numPoliciaNac?: number | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt?: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @ManyToOne(() => Municipios, municipios => municipios.clientes)
  @JoinColumn([{ name: "municipio_id", referencedColumnName: "id" }])
  municipio?: Municipios;

  @OneToOne(() => Personas, personas => personas.clientes)
  @JoinColumn([{ name: "persona_id", referencedColumnName: "id" }])
  persona?: Personas;

  @ManyToOne(() => Provincias, provincias => provincias.clientes)
  @JoinColumn([{ name: "provincia_id", referencedColumnName: "id" }])
  provincia?: Provincias;

  @OneToMany(() => Instalaciones, instalaciones => instalaciones.cliente)
  instalaciones?: Instalaciones[];

  @OneToMany(() => Propiedades, propiedades => propiedades.cliente)
  propiedades?: Propiedades[];
}
