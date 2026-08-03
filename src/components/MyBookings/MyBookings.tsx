import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cancelBooking, getMyBookings } from "../../api";
import type { Booking } from "../../types/booking";
import "./MyBookings.css";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }
    fetchBookings();
  }, [navigate]);

  const handleCancel = async (id: number) => {
    if (!window.confirm("Cancel this booking?")) return;

    setCancellingId(id);
    try {
      await cancelBooking(id);
      setError("");
      await fetchBookings();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (value: string) =>
    value.includes("T") ? value.slice(0, 10) : value;

  if (loading) {
    return (
      <div className="my-bookings-page">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      {error && <p className="bookings-error">{error}</p>}
      {!error && bookings.length === 0 && (
        <p className="bookings-empty">You have no bookings yet.</p>
      )}
      {bookings.length > 0 && (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Pick-up</th>
              <th>End</th>
              <th>Days</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const carLabel = booking.car
                ? `${booking.car.brand} ${booking.car.name}`
                : `Car #${booking.car_id}`;

              return (
                <tr key={booking.id}>
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
                  <td>
                    {booking.status === "confirmed" && (
                      <button
                        className="btn-cancel-booking"
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancellingId === booking.id}
                      >
                        {cancellingId === booking.id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    )}
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

export default MyBookings;
