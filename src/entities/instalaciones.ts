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

import { Clientes } from "./clientes";
import { Contratos } from "./contratos";
import { InstalacionesPersonas } from "./instalaciones-personas";
import { Propiedades } from "./propiedades";

@Index("instalaciones_pkey", ["id"], { unique: true })
@Entity("instalaciones", { schema: "public" })
export class Instalaciones {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id?: string;

  @Column("character", { name: "tipo", nullable: true, length: 1 })
  tipo?: string | null;

  @Column("numeric", { name: "precio", nullable: true, precision: 9, scale: 2 })
  precio?: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt?: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @OneToOne(() => Contratos, contratos => contratos.instalacion)
  contratos?: Contratos;

  @ManyToOne(() => Clientes, clientes => clientes.instalaciones)
  @JoinColumn([{ name: "cliente_id", referencedColumnName: "id" }])
  cliente?: Clientes;

  @OneToMany(
    () => InstalacionesPersonas,
    instalacionesPersonas => instalacionesPersonas.instalacion,
  )
  instalacionesPersonas?: InstalacionesPersonas[];

  @OneToOne(() => Propiedades, propiedades => propiedades.instalacion)
  propiedades?: Propiedades;
}
