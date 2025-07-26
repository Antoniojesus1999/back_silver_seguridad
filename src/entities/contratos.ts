import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";

import { Instalaciones } from "./instalaciones";

@Index("contratos_pkey", ["id"], { unique: true })
@Index("contratos_instalacion_id_key", ["instalacionId"], { unique: true })
@Entity("contratos", { schema: "public" })
export class Contratos {
  @Column("integer", { primary: true, name: "id" })
  id?: number;

  @Column("integer", { name: "instalacion_id", nullable: true, unique: true })
  instalacionId?: number | null;

  @Column("character", { name: "tipo", nullable: true, length: 1 })
  tipo?: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt?: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @OneToOne(
    () => Instalaciones,
    (instalaciones: Instalaciones) => instalaciones.contratos,
  )
  @JoinColumn([{ name: "instalacion_id", referencedColumnName: "id" }])
  instalacion?: Instalaciones;
}
