import type { Car } from "./car";

export type BookingStatus = "confirmed" | "cancelled";

export interface BookingUser {
  id: number;
  name: string;
  email: string;
}

export interface Booking {
  id: number;
  user_id: number;
  car_id: number;
  customer_name: string;
  phone: string;
  start_date: string;
  days: number;
  end_date: string;
  total_price: number;
  status: BookingStatus;
  car?: Car;
  user?: BookingUser;
  created_at?: string;
  updated_at?: string;
}

export type CreateBookingPayload = {
  car_id: number;
  start_date: string;
  days: number;
  customer_name: string;
  phone: string;
};
