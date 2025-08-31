import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { fixtures } from './films.fixtures';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from 'src/typeorm/entities/film.entity';
import { Schedule } from 'src/typeorm/entities/schedule.entity';

describe('FilmsController', () => {
  let controller: FilmsController;

  const filmRepoMock = {
    find: jest.fn().mockResolvedValue(fixtures.films),
    findOne: jest.fn().mockResolvedValue(fixtures.film),
  };

  const scheduleRepoMock = {
    find: jest.fn().mockResolvedValue(fixtures.film.schedule),
    findOne: jest.fn().mockResolvedValue(fixtures.film.schedule[0]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: filmRepoMock,
        },
        {
          provide: getRepositoryToken(Schedule),
          useValue: scheduleRepoMock,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should find all films', async () => {
    const result = await controller.findFilmsAll();
    expect(result).toEqual({
      total: fixtures.films.length,
      items: fixtures.films,
    });
  });

  it('should find one schedule', async () => {
    const result = await controller.findFilmScheduleById('11');
    expect(result).toEqual({
      total: fixtures.film.schedule.length,
      items: fixtures.film.schedule,
    });
  });
});
