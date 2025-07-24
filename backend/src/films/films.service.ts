import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Film } from 'src/typeorm/entities/film.entity';
import { Schedule } from 'src/typeorm/entities/schedule.entity';
interface IFilms {
  total: number;
  items: Film[];
}

interface ISchedules {
  total: number;
  items: Schedule[];
}

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,

    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<IFilms> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
    return { total: films.length, items: films };
  }

  async findScheduleById(filmId: string): Promise<ISchedules> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedule'],
    });

    if (!film) {
      throw new NotFoundException(`Фильм не найден: ${filmId}`);
    }

    return { total: film.schedule.length, items: film.schedule };
  }
}
