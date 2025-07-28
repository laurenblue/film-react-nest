import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockFilmsService = {
    findAll: jest.fn(),
    findScheduleById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [{ provide: FilmsService, useValue: mockFilmsService }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all films', async () => {
    const mockResult = [{ title: 'Film 1' }];
    mockFilmsService.findAll.mockResolvedValue(mockResult);

    const result = await controller.findFilmsAll();
    expect(result).toEqual(mockResult);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return schedule for film by id', async () => {
    const mockResult = [{ date: '2025-08-01' }];
    mockFilmsService.findScheduleById.mockResolvedValue(mockResult);

    const result = await controller.findFilmScheduleById('123');
    expect(result).toEqual(mockResult);
    expect(service.findScheduleById).toHaveBeenCalledWith('123');
  });
});
