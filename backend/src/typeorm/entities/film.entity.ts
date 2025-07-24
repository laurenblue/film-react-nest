import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity({ name: 'films' })
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column()
  rating: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  image: string;

  @Column()
  about: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
