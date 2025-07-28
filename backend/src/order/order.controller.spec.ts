import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrdersDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new order', async () => {
    const dto: CreateOrdersDto = {
      email: 'test@example.com',
      phone: '1234567890',
      id: 'order-id-1',
      tickets: [
        {
          film: 'Matrix',
          session: '2025-08-01T19:00:00Z',
          daytime: 'evening',
          row: 5,
          seat: 8,
          price: 500,
          id: 'ticket-1',
        },
      ],
    };

    const mockResult = { success: true };
    mockOrderService.createOrder.mockResolvedValue(mockResult);

    const result = await controller.create(dto);
    expect(result).toEqual(mockResult);
    expect(service.createOrder).toHaveBeenCalledWith(dto);
  });
});
