import { Injectable, BadRequestException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrdersDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepo: FilmsRepository) {}

  async createOrder(dto: CreateOrdersDto) {
    const takenMap: Record<string, string[]> = {};

    for (const ticket of dto.tickets) {
      const seatCode = `${ticket.row}:${ticket.seat}`;
      const film = await this.filmsRepo.findFilmById(ticket.film);
      if (!film) {
        throw new BadRequestException(`Фильм не найден: ${ticket.film}`);
      }

      const schedule = film.schedule.find((s) => s.id === ticket.session);
      if (!schedule) {
        throw new BadRequestException(`Сеанс не найден: ${ticket.session}`);
      }

      if (schedule.taken.includes(seatCode)) {
        throw new BadRequestException(`Место уже занято: ${seatCode}`);
      }

      const key = `${film.id}_${schedule.id}`;
      if (!takenMap[key]) {
        takenMap[key] = [];
      }
      takenMap[key].push(seatCode);
    }

    for (const key of Object.keys(takenMap)) {
      const [filmId, sessionId] = key.split('_');
      const film = await this.filmsRepo.findFilmById(filmId);
      const schedule = film.schedule.find((s) => s.id === sessionId);
      schedule.taken.push(...takenMap[key]);
      await this.filmsRepo.saveFilm(film);
    }

    return { success: true };
  }
}
