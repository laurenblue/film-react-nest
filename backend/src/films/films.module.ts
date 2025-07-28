import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from 'src/typeorm/entities/film.entity';
import { Schedule } from './films.schema';
import { FilmsRepository } from '../repository/films.repository';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Film, Schedule]),
  ],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository],
  exports: [FilmsRepository],
})
export class FilmsModule {}
