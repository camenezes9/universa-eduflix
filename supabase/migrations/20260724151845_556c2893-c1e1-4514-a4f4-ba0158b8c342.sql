CREATE TABLE public.visit_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_date date NOT NULL,
  visit_time time NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  course_slug text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT visit_bookings_unique_slot UNIQUE (visit_date, visit_time)
);

CREATE INDEX visit_bookings_date_idx ON public.visit_bookings (visit_date);

GRANT ALL ON public.visit_bookings TO service_role;

ALTER TABLE public.visit_bookings ENABLE ROW LEVEL SECURITY;