import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/typeorm/entities/film.entity';
import { Schedule } from 'src/typeorm/entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateOrdersDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,

    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async createOrder(dto: CreateOrdersDto) {
    const takenMap: Record<string, string[]> = {};

    for (const ticket of dto.tickets) {
      const seatCode = `${ticket.row}:${ticket.seat}`;

      const schedule = await this.scheduleRepo.findOne({
        where: { id: ticket.session },
        relations: ['film'],
      });

      if (!schedule) {
        throw new BadRequestException(`Сеанс не найден: ${ticket.session}`);
      }

      if (schedule.film.id !== ticket.film) {
        throw new BadRequestException(
          `Сеанс не относится к фильму: ${ticket.film}`,
        );
      }

      if (schedule.taken.includes(seatCode)) {
        throw new BadRequestException(`Место уже занято: ${seatCode}`);
      }

      if (!takenMap[schedule.id]) {
        takenMap[schedule.id] = [];
      }
      takenMap[schedule.id].push(seatCode);
    }

    for (const sessionId of Object.keys(takenMap)) {
      const schedule = await this.scheduleRepo.findOneBy({ id: sessionId });
      schedule.taken.push(...takenMap[sessionId]);
      await this.scheduleRepo.save(schedule);
    }

    return { success: true };
  }
}
