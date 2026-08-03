import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Booking.css";
import { getCar, carImageUrl, createBooking } from "../../api";
import type { Car } from "../../types/car";
import axios from "axios";

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }

    if (!carId) {
      setLoading(false);
      setError("No car selected");
      return;
    }

    const fetchCar = async () => {
      try {
        const data = await getCar(carId);
        setCar(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load car from API");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId, navigate]);

  const handleConfirm = async (e: FormEvent) => {
    e.preventDefault();
    if (!car) return;

    if (!startDate) {
      setSubmitError("Please select a pick-up date.");
      return;
    }
    if (days < 1) {
      setSubmitError("Number of days must be at least 1.");
      return;
    }
    if (!customerName.trim()) {
      setSubmitError("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setSubmitError("Please enter your phone number.");
      return;
    }

    setSubmitError("");
    setSubmitting(true);

    try {
      await createBooking({
        car_id: car.id,
        start_date: startDate,
        days,
        customer_name: customerName.trim(),
        phone: phone.trim(),
      });
      navigate("/my-bookings");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          (err.response?.data?.errors
            ? Object.values(err.response.data.errors).flat().join(" ")
            : null) ||
          "Failed to create booking.";
        setSubmitError(String(message));
      } else {
        setSubmitError("Failed to create booking.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="booking-page">
        <div className="booking-panel booking-panel--status">
          <p>Loading car...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="booking-page">
        <div className="booking-panel booking-panel--status">
          <h2>{error || "No car selected"}</h2>
          <button
            type="button"
            className="booking-secondary-btn"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const dailyPrice = car.price_per_day || 0;
  const totalPrice = dailyPrice * days;
  const displayTitle = `${car.brand} ${car.name}`;

  return (
    <div className="booking-page">
      <div className="booking-panel">
        <div className="booking-card">
          <div className="booking-image">
            <img src={carImageUrl(car.image_url)} alt={displayTitle} />
          </div>

          <div className="booking-info">
            <p className="booking-eyebrow">Reserve your ride</p>
            <h1>
              {displayTitle}{" "}
              <span className="booking-year">({car.year})</span>
            </h1>
            <p className="booking-desc">{car.description}</p>
            <p className="booking-rate">{dailyPrice}€ / day</p>

            <form className="booking-form" onSubmit={handleConfirm}>
              <div className="booking-fields">
                <label>
                  Pick-up date
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </label>
                <label>
                  Number of days
                  <input
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                  />
                </label>
              </div>

              <div className="booking-total">
                <span>Total</span>
                <strong>{totalPrice}€</strong>
              </div>

              <h3 className="booking-section-title">Customer information</h3>
              <div className="booking-fields">
                <label>
                  Full name
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </label>
                <label>
                  Phone number
                  <input
                    type="text"
                    placeholder="Your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>

              {submitError && (
                <p className="booking-error">{submitError}</p>
              )}

              <button
                type="submit"
                className="confirm-btn"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Confirm Reservation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
