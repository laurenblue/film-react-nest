\connect films
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

SET default_tablespace = '';
SET default_table_access_method = heap;

-- Таблица films
CREATE TABLE public.films (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
    rating double precision NOT NULL,
    director character varying NOT NULL,
    tags text NOT NULL,
    image character varying NOT NULL,
    cover character varying NOT NULL,
    title character varying NOT NULL,
    about character varying NOT NULL,
    description character varying NOT NULL
);
ALTER TABLE public.films OWNER TO postgres;

-- Таблица schedules
CREATE TABLE public.schedules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL PRIMARY KEY,
    daytime character varying NOT NULL,
    hall integer NOT NULL,
    rows integer NOT NULL,
    seats integer NOT NULL,
    price double precision NOT NULL,
    taken text[] NOT NULL DEFAULT ARRAY[]::text[],
    film_id uuid REFERENCES public.films(id) ON DELETE CASCADE
);
ALTER TABLE public.schedules OWNER TO postgres;

INSERT INTO public.films("id","rating","director","tags","image","cover","title","about","description") VALUES('92b8a2a7-ab6b-4fa9-915b-d27945865e39',8.1,'Амелия Хьюз','Рекомендуемые','/bg6s.jpg','/bg6c.jpg','Сон в летний день','Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.','Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?');
INSERT INTO public.films("id","rating","director","tags","image","cover","title","about","description") VALUES('0354a762-8928-427f-81d7-1656f717f39c',9.5,'Оливер Беннет','Рекомендуемые','/bg4s.jpg','/bg4c.jpg','Парадокс Нексуса','Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания','В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.');
INSERT INTO public.films("id","rating","director","tags","image","cover","title","about","description") VALUES('5b70cb1a-61c9-47b1-b207-31f9e89087ff',8.9,'Лила Васкес','Рекомендуемые','/bg2s.jpg','/bg2c.jpg','Стражи Гримуара','Фэнтезийное приключение об истинном значении дружбы, мужества и силы знаний','Захватывающее фэнтезийное приключение, которое рассказывает о группе героев, которые должны защитить древний магический том от попадания в руки тёмного колдуна. История об истинном значении дружбы, мужества и силы знаний.');
INSERT INTO public.films("id","rating","director","tags","image","cover","title","about","description") VALUES('3bedbc5a-844b-40eb-9d77-83b104e0cf75',8.5,'Элиза Уиттакер','Рекомендуемые','/bg5s.jpg','/bg5c.jpg','Звёздное путешествие','Научно-фантастический фильм о команде астронавтов, исследующий темы жизнестойкости, надежды и силы человеческих связей','«Звёздное путешествие» — прекрасный научно-фантастический фильм о команде астронавтов, путешествующих по галактике в поисках нового дома для человечества. Помимо потрясающей работы оператора и специалистов по визуальным эффектам, можно отметить темы, исследуемые в фильме: жизнестойкости, надежды и силы человеческих связей.');
INSERT INTO public.films("id","rating","director","tags","image","cover","title","about","description") VALUES('51b4bc85-646d-47fc-b988-3e7051a9fe9e',9,'Харрисон Рид','Рекомендуемые','/bg3s.jpg','/bg3c.jpg','Недостижимая утопия','Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.','Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.');
INSERT INTO public.films("id","rating","director","tags","image","cover","title","about","description") VALUES('0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',2.9,'Итан Райт','Документальный','/bg1s.jpg','/bg1c.jpg','Архитекторы общества','Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.','Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.');

INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T10:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',0,'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T14:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',1,'5beec101-acbb-4158-adc6-d855716b44a8',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T16:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',2,'89ee32f3-8164-40a6-b237-f4d492450250',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T11:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',0,'d6a4ed9b-51d6-4df2-b66e-d75175deb373',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T15:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',1,'a8af36c3-65ee-4224-a77d-c9ebb790ba66',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T17:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',2,'0cf8b68c-fcf2-4c0a-97ba-45990231fa0e',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T12:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',0,'2519ca34-32b4-4a7f-971d-3bb585c6450b',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T16:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',1,'b105ad4b-ecd2-4556-abaf-9a95403dc01c',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T18:00:53+03:00','0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',2,'02a9feb2-fc92-4386-a917-aa79e7f8fd7f',350,5,10,'{}');

INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T10:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',0,'9647fcf2-d0fa-4e69-ad90-2b23cff15449',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T14:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',1,'9f2db237-01d0-463e-a150-89f30bfc4250',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T16:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',2,'3d5f5d12-b4d8-44d3-a440-1b91616fda40',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T11:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',0,'7f59de0d-62b2-412f-9e0b-bf6e971c44e5',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T15:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',1,'65f4a65e-1bc1-4677-842b-10e9b317b287',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T17:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',2,'b3ba6b69-050e-498c-9cdb-92711d8e4180',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T12:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',0,'d87ee9ab-4d84-43bb-85d6-f71aced22f73',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T16:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',1,'eed1469f-c95e-428a-870d-13cbfe4ac2ac',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T18:00:53+03:00','51b4bc85-646d-47fc-b988-3e7051a9fe9e',2,'68437c84-6c35-4203-bff7-021d16042a6b',350,5,10,'{}');

INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T10:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',0,'351b437c-3430-4a35-b71d-b93b3d80274a',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T14:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',1,'2661b7e2-7654-4d17-aa5d-9da76e4fb563',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-28T16:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',2,'d155ff3f-d547-4e4d-a530-bfcdcb3efbd5',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T11:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',0,'baf5d315-f3ad-4ebc-bbdc-544c51f3a2f3',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T15:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',1,'5a102896-b6ac-4db1-9f93-1653dde8a5f2',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-29T17:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',2,'c06b2048-a159-4356-b51b-3d7817766d02',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T12:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',0,'ee489a8b-68be-48a1-b62f-896981d60b06',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T16:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',1,'a33f5fda-c4d8-4a1b-9f86-cd39d73fdc98',350,5,10,'{}');
INSERT INTO public.schedules("daytime","film_id","hall","id","price","rows","seats","taken") VALUES('2024-06-30T18:00:53+03:00','3bedbc5a-844b-40eb-9d77-83b104e0cf75',2,'24074084-1d42-49ff-b0fb-e64029674718',350,5,10,'{}');
