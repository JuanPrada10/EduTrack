import { InscripcionEntity } from 'src/inscripcion/entity/inscripciones.entity';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'estudiantes' })
@Unique(['usuario'])
export class EstudianteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  ano_ingreso: number;

  @OneToOne(() => UsuarioEntity, (usuario) => usuario.estudiante, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @OneToMany(() => InscripcionEntity, (inscripcion) => inscripcion.estudiante)
  inscripciones: InscripcionEntity[];
}
