import { CursoEntity } from 'src/curso/entity/curso.entity';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'profesores' })
@Unique(['usuario'])
export class ProfesorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  especialidad: string;

  @OneToOne(() => UsuarioEntity, (usuario) => usuario.profesor, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @OneToMany(() => CursoEntity, (curso) => curso.profesor)
  cursos: CursoEntity[];
}
