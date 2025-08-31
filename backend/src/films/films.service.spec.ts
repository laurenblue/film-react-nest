import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { fixtures } from './films.fixtures';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from 'src/typeorm/entities/film.entity';
import { Schedule } from 'src/typeorm/entities/schedule.entity';

describe('FilmsService', () => {
  let service: FilmsService;

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

    service = module.get<FilmsService>(FilmsService);
  });

  it('should find all films', async () => {
    const films = await service.findAll();
    expect(films).toEqual({
      total: fixtures.films.length,
      items: fixtures.films,
    });
  });

  it('should find schedules for a film', async () => {
    const schedules = await service.findScheduleById('11');
    expect(schedules).toEqual({
      total: fixtures.film.schedule.length,
      items: fixtures.film.schedule,
    });
  });
});
