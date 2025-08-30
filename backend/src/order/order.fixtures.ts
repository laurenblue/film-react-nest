import { Ticket, CreateOrdersDto  } from "./dto/order.dto";

const postOrderTicket: Ticket = {
  film: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
  session: '5274c89d-f39c-40f9-bea8-f22a22a50c8a',
  daytime: '2024-06-28T10:00:53+03:00',
  row: 1,
  seat: 1,
  price: 350,
  id: 'ticket-1',
};

const postOrder: CreateOrdersDto = {
  email: 'test@example.com',
  phone: '+79998887766',
  tickets: [postOrderTicket],
  id: 'order-1',
};

export const fixtures = {
  postOrderTicket,
  postOrder,
};
