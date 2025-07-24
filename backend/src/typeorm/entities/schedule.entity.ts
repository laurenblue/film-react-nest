import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Film } from './film.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: string;

  @Column('int')
  rows: number;

  @Column('int')
  seats: number;

  @Column('int')
  price: number;

  @Column('jsonb')
  taken: boolean[][];

  @ManyToOne(() => Film, (film) => film.schedule, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'film_id' })
  film: Film;
}
