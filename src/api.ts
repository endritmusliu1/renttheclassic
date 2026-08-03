import axios from "axios";
import type { Car } from "./types/car";
import type { Booking, CreateBookingPayload } from "./types/booking";

export const API_ORIGIN = "http://127.0.0.1:8000";
const API_BASE_URL = `${API_ORIGIN}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Resolve car image paths from the API (relative or absolute). */
export function carImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `${API_ORIGIN}/${imageUrl.replace(/^\//, "")}`;
}

export type CarFormPayload = {
  name: string;
  brand: string;
  year: number;
  price_per_day: number;
  description?: string;
  image?: File | null;
};

function toFormData(payload: CarFormPayload): FormData {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("brand", payload.brand);
  formData.append("year", String(payload.year));
  formData.append("price_per_day", String(payload.price_per_day));
  formData.append("description", payload.description ?? "");
  if (payload.image) {
    formData.append("image", payload.image);
  }
  return formData;
}

export async function getCars(): Promise<Car[]> {
  const response = await api.get<Car[]>("/cars");
  return response.data;
}

export async function getCar(id: number | string): Promise<Car> {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
}

export async function createCar(payload: CarFormPayload): Promise<Car> {
  const response = await api.post<Car>("/cars", toFormData(payload));
  return response.data;
}

export async function updateCar(
  id: number,
  payload: CarFormPayload
): Promise<Car> {
  // POST + multipart (PUT cannot carry file uploads reliably)
  const response = await api.post<Car>(`/cars/${id}`, toFormData(payload));
  return response.data;
}

export async function deleteCar(id: number): Promise<void> {
  await api.delete(`/cars/${id}`);
}

export async function createBooking(
  payload: CreateBookingPayload
): Promise<Booking> {
  const response = await api.post<Booking>("/bookings", payload);
  return response.data;
}

export async function getMyBookings(): Promise<Booking[]> {
  const response = await api.get<Booking[]>("/bookings");
  return response.data;
}

export async function cancelBooking(id: number): Promise<Booking> {
  const response = await api.post<Booking>(`/bookings/${id}/cancel`);
  return response.data;
}

export async function getAdminBookings(): Promise<Booking[]> {
  const response = await api.get<Booking[]>("/admin/bookings");
  return response.data;
}

export default api;
