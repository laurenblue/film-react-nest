import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { fixtures } from './order.fixtures';
import * as filmFixtures from '../films/films.fixtures';
import { FilmsService } from '../films/films.service';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from 'src/typeorm/entities/film.entity';
import { Schedule } from 'src/typeorm/entities/schedule.entity';

describe('OrderController', () => {
  let controller: OrderController;

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
      controllers: [OrderController],
      providers: [
        FilmsService,
        OrderService,
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

    controller = module.get<OrderController>(OrderController);
  });

  it('should succeed if place is empty', async () => {
    const res = await controller.create({
      email: 'xxx',
      phone: '+7',
      tickets: [fixtures.postOrderTicket],
      id: 'order-1',
    });

    expect(res).toEqual({
      total: 1,
      items: [fixtures.postOrderTicket],
    });
  });

  it('should fail if place is busy', async () => {
    scheduleRepoMock.findOne.mockResolvedValueOnce({
      ...film.schedule[0],
      film: { id: film.id },
      taken: [`${fixtures.postOrderTicket.row}:${fixtures.postOrderTicket.seat}`],
    });

    const res = controller.create({
      email: 'xxx',
      phone: '+7',
      tickets: [fixtures.postOrderTicket],
      id: 'order-2',
    });

    await expect(res).rejects.toThrow('already taken');
  });
});
