import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Clientes } from "./clientes";
import { InstalacionesPersonas } from "./instalaciones-personas";

@Index("personas_pkey", ["id"], { unique: true })
@Entity("personas", { schema: "public" })
export class Personas {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("character varying", { name: "nombre", nullable: true, length: 50 })
  nombre?: string | null;

  @Column("character varying", {
    name: "apellido1",
    nullable: true,
    length: 50,
  })
  apellido1?: string | null;

  @Column("character varying", {
    name: "apellido2",
    nullable: true,
    length: 50,
  })
  apellido2?: string | null;

  @Column("character varying", { name: "nif_nie", nullable: true, length: 10 })
  nifNie?: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 12 })
  telefono?: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 50 })
  email?: string | null;

  @OneToOne(() => Clientes, clientes => clientes.persona)
  clientes?: Clientes;

  @OneToMany(
    () => InstalacionesPersonas,
    instalacionesPersonas => instalacionesPersonas.persona,
  )
  instalacionesPersonas?: InstalacionesPersonas[];
}
