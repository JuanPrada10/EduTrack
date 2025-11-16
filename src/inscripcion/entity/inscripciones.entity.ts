import { EstudianteEntity } from 'src/estudiante/entity/estudiante.entity';
import { CursoEntity } from 'src/curso/entity/curso.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'inscripciones' })
@Unique(['estudiante', 'curso'])
export class InscripcionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_inscripcion: Date;

  @Column('float', { nullable: false, default: 0 })
  nota: number;

  @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.inscripciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante: EstudianteEntity;

  @ManyToOne(() => CursoEntity, (curso) => curso.inscripciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'curso_id' })
  curso: CursoEntity;
}
