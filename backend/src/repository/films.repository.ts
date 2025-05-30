import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmsDocument } from '../films/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name)
    private filmModel: Model<FilmsDocument>,
  ) {}

  async findFilmById(id: string): Promise<FilmsDocument> {
    return this.filmModel.findOne({ id }).exec();
  }

  async saveFilm(film: FilmsDocument): Promise<FilmsDocument> {
    return film.save();
  }
}
