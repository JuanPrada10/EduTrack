import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { RolType } from '../interface/rolTypes';
import { ProfesorEntity } from 'src/profesor/entity/profesor.entity';
import { EstudianteEntity } from 'src/estudiante/entity/estudiante.entity';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'full_name' })
  fullName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: RolType })
  rol: RolType;

  @OneToOne(() => ProfesorEntity, (profesor) => profesor.usuario)
  profesor?: ProfesorEntity;

  @OneToOne(() => EstudianteEntity, (estudiante) => estudiante.usuario)
  estudiante?: EstudianteEntity;
}
