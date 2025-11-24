import { InscripcionEntity } from 'src/inscripcion/entity/inscripciones.entity';
import { ProfesorEntity } from 'src/profesor/entity/profesor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'cursos' })
export class CursoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text')
  descripcion: string;

  @Column('int')
  creditos: number;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.cursos, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'profesor_id' })
  profesor: ProfesorEntity;

  @OneToMany(() => InscripcionEntity, (inscripcion) => inscripcion.curso)
  inscripciones: InscripcionEntity[];
}
