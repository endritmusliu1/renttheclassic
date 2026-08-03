import React, { useEffect, useState } from "react";
import "./FeaturedCars.css";
import { useNavigate } from "react-router-dom";
import { getCars, carImageUrl } from "../../api";
import type { Car } from "../../types/car";

const FeaturedCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load cars. Is the API running?");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleRent = (car: Car) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must login first!");
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    navigate(`/booking/${car.id}`);
  };

  return (
    <section id="featured-cars" className="featured-cars">
      <div className="featured-header">
        <h2>Choose the car you always dreamt of:</h2>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading fleet...</p>}
      {error && <p style={{ textAlign: "center", color: "#c44" }}>{error}</p>}
      {message && (
        <p className="status-message error">{message}</p>
      )}

      <div className="cars-container">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <div className="image-container">
              <img src={carImageUrl(car.image_url)} alt={`${car.brand} ${car.name}`} />
            </div>

            <div className="car-info">
              <h2>
                {car.brand} {car.name} ({car.year})
              </h2>
              <p>{car.description}</p>
              <p className="price">Price: {car.price_per_day}€/day</p>
            </div>

            <div className="card-footer">
              <button onClick={() => handleRent(car)}>Rent Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCars;
