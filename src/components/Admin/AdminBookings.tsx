import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminBookings } from "../../api";
import type { Booking } from "../../types/booking";
import "../Admin/AdminDashboard.css";
import "./AdminBookings.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAdminBookings();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatDate = (value: string) =>
    value.includes("T") ? value.slice(0, 10) : value;

  return (
    <div className="admin-dashboard">
      <div className="admin-nav-links">
        <Link to="/admin/dashboard">Cars</Link>
        <Link to="/admin/bookings" className="active">
          Bookings
        </Link>
      </div>
      <h1>Bookings Overview</h1>

      {loading && <p>Loading bookings...</p>}
      {error && <p className="bookings-error">{error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <p>No bookings yet.</p>
      )}

      {bookings.length > 0 && (
        <table className="fleet-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>User email</th>
              <th>Car</th>
              <th>Pick-up</th>
              <th>End</th>
              <th>Days</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const carLabel = booking.car
                ? `${booking.car.brand} ${booking.car.name}`
                : `Car #${booking.car_id}`;

              return (
                <tr key={booking.id}>
                  <td>{booking.customer_name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.user?.email ?? "—"}</td>
                  <td>{carLabel}</td>
                  <td>{formatDate(booking.start_date)}</td>
                  <td>{formatDate(booking.end_date)}</td>
                  <td>{booking.days}</td>
                  <td>{booking.total_price}€</td>
                  <td>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBookings;
