import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
  ) {}

  async findFilmById(id: string): Promise<Film | null> {
    return this.filmRepo.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async saveFilm(film: Film): Promise<Film> {
    return this.filmRepo.save(film);
  }

  async findAllFilms(): Promise<Film[]> {
    return this.filmRepo.find({ relations: ['schedule'] });
  }
}
