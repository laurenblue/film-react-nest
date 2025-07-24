CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.films (
    id          uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    rating      double precision                NOT NULL,
    director    varchar                         NOT NULL,
    tags        text                            NOT NULL,
    image       varchar                         NOT NULL,
    cover       varchar                         NOT NULL,
    title       varchar                         NOT NULL,
    about       varchar                         NOT NULL,
    description varchar                         NOT NULL
);

ALTER TABLE public.films OWNER TO film_user;

CREATE TABLE IF NOT EXISTS public.schedules (
    id       uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    daytime  varchar                         NOT NULL,
    hall     integer                         NOT NULL,
    rows     integer                         NOT NULL,
    seats    integer                         NOT NULL,
    price    double precision                NOT NULL,
    taken    text                            NOT NULL,
    "filmId" uuid REFERENCES public.films
);

ALTER TABLE public.schedules OWNER TO film_user;
