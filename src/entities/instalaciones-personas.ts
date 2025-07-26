import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";

import { Instalaciones } from "./instalaciones";
import { Personas } from "./personas";

@Index("instalaciones_personas_pkey", ["instalacionId", "personaId"], {
  unique: true,
})
@Entity("instalaciones_personas", { schema: "public" })
export class InstalacionesPersonas {
  @Column("bigint", { primary: true, name: "instalacion_id" })
  instalacionId?: string;

  @Column("bigint", { primary: true, name: "persona_id" })
  personaId?: string;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt?: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @ManyToOne(
    () => Instalaciones,
    (instalaciones: Instalaciones) => instalaciones.instalacionesPersonas,
  )
  @JoinColumn([{ name: "instalacion_id", referencedColumnName: "id" }])
  instalacion?: Instalaciones;

  @ManyToOne(
    () => Personas,
    (personas: Personas) => personas.instalacionesPersonas,
  )
  @JoinColumn([{ name: "persona_id", referencedColumnName: "id" }])
  persona?: Personas;
}
