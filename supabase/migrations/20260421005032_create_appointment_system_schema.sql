/*
  # Create Appointment System Schema

  1. New Tables
    - `branches`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
    - `appointment_types`
      - `id` (uuid, primary key)
      - `name` (text)
      - `duration` (integer, minutes)
      - `description` (text)
      - `created_at` (timestamptz)
    - `appointments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type_id` (uuid, references appointment_types)
      - `branch_id` (uuid, references branches)
      - `date` (date)
      - `time` (text)
      - `status` (text: confirmed, pending, cancelled)
      - `customer_name` (text)
      - `notes` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - branches and appointment_types: all authenticated users can read
    - appointments: users can only read/write their own

  3. Seed Data
    - 3 branches
    - 5 appointment types
*/

CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointment_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration integer NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type_id uuid NOT NULL REFERENCES appointment_types(id),
  branch_id uuid NOT NULL REFERENCES branches(id),
  date date NOT NULL,
  time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  customer_name text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read branches"
  ON branches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read appointment types"
  ON appointment_types FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own appointments"
  ON appointments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

INSERT INTO branches (name, address, phone) VALUES
  ('Downtown Branch', '123 Main St, City Center', '(555) 123-4567'),
  ('Westside Branch', '456 West Ave, Westside', '(555) 234-5678'),
  ('Northgate Branch', '789 North Blvd, Northgate', '(555) 345-6789')
ON CONFLICT DO NOTHING;

INSERT INTO appointment_types (name, duration, description) VALUES
  ('Account Opening', 30, 'Open a new checking or savings account'),
  ('Loan Consultation', 45, 'Discuss personal or business loan options'),
  ('Financial Advice', 60, 'Get expert advice on investments and planning'),
  ('Mortgage Consultation', 60, 'Discuss home loan and mortgage options'),
  ('Credit Card Application', 20, 'Apply for a new credit card')
ON CONFLICT DO NOTHING;
