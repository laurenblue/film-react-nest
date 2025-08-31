import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { fixtures } from './order.fixtures';
import * as filmFixtures from '../films/films.fixtures';
import { FilmsService } from '../films/films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from 'src/typeorm/entities/film.entity';
import { Schedule } from 'src/typeorm/entities/schedule.entity';

describe('OrderService', () => {
  let service: OrderService;

  const film = filmFixtures.fixtures.film;

  const filmRepoMock = {
    find: jest.fn().mockResolvedValue(filmFixtures.fixtures.films),
    findOne: jest.fn().mockResolvedValue(film),
    save: jest.fn().mockResolvedValue(film.id),
  };

  const scheduleRepoMock = {
    find: jest.fn().mockResolvedValue(film.schedule),
    findOne: jest.fn().mockResolvedValue({
      ...film.schedule[0],
      film: { id: film.id },
      taken: [],
    }),
    findOneBy: jest.fn().mockResolvedValue({
      ...film.schedule[0],
      film: { id: film.id },
      taken: [],
    }),
    save: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
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

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order if seat is available', async () => {
    const res = await service.createOrder(fixtures.postOrder);
    expect(res).toEqual({
      total: 1,
      items: [fixtures.postOrderTicket],
    });
  });

  it('should throw if seat is already taken', async () => {
    scheduleRepoMock.findOne.mockResolvedValueOnce({
      ...film.schedule[0],
      film: { id: film.id },
      taken: [`${fixtures.postOrderTicket.row}:${fixtures.postOrderTicket.seat}`],
    });

    await expect(service.createOrder(fixtures.postOrder)).rejects.toThrow(
      'already taken',
    );
  });
});
