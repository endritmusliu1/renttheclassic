import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import "./AdminBookings.css";
import { carImageUrl, createCar, deleteCar, getCars, updateCar } from "../../api";
import type { Car } from "../../types/car";

const AdminDashboard = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState(2000);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const showMessage = (text: string, error = false) => {
    setMessage(text);
    setIsError(error);
  };

  const fetchCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
    } catch (err) {
      console.error(err);
      showMessage("Failed to load cars from API", true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const resetForm = () => {
    setName("");
    setBrand("");
    setYear(2000);
    setPrice(0);
    setDescription("");
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else if (editingId) {
      const existing = cars.find((c) => c.id === editingId);
      setImagePreview(existing ? carImageUrl(existing.image_url) : "");
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!editingId && !imageFile) {
      showMessage("Please upload a car image", true);
      return;
    }

    const payload = {
      name,
      brand,
      year,
      price_per_day: price,
      description,
      image: imageFile,
    };

    try {
      if (editingId) {
        await updateCar(editingId, payload);
        showMessage("Car updated!");
      } else {
        await createCar(payload);
        showMessage("Car added!");
      }
      resetForm();
      await fetchCars();
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.status === 403
          ? "Admin access required"
          : err.response?.status === 401
            ? "Please login again"
            : err.response?.data?.message || "Failed to save car";
      showMessage(errorMessage, true);
    }
  };

  const handleEdit = (car: Car) => {
    setEditingId(car.id);
    setName(car.name);
    setBrand(car.brand);
    setYear(car.year);
    setPrice(car.price_per_day);
    setDescription(car.description || "");
    setImageFile(null);
    setImagePreview(carImageUrl(car.image_url));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteCar(id);
      showMessage("Car deleted!");
      await fetchCars();
    } catch (err: any) {
      console.error(err);
      const errorMessage =
        err.response?.status === 403
          ? "Admin access required"
          : "Failed to delete car";
      showMessage(errorMessage, true);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-nav-links">
        <Link to="/admin/dashboard" className="active">
          Cars
        </Link>
        <Link to="/admin/bookings">Bookings</Link>
      </div>
      <h1>Admin Fleet Management</h1>

      {message && (
        <div className={`status-message ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <div className="form-card">
        <h2>{editingId ? "Edit Classic Car" : "Add New Classic Car"}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            placeholder="Car Model Name (e.g., Mustang 1967)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Brand (e.g., Ford)"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
          <input
            type="number"
            placeholder="Price per Day (€)"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <div className="image-upload">
            <label htmlFor="car-image">Car Image</label>
            <input
              id="car-image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImageChange}
              required={!editingId}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Car preview"
                className="image-preview"
              />
            )}
            {editingId && !imageFile && (
              <p className="image-hint">Leave empty to keep the current image.</p>
            )}
          </div>

          <textarea
            placeholder="Car Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {editingId ? "Update Car" : "Add Car"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-cancel">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h2>Current Fleet</h2>
      {loading ? (
        <p>Loading fleet...</p>
      ) : (
        <table className="fleet-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Year</th>
              <th>Price / Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>
                  {car.image_url ? (
                    <img
                      src={carImageUrl(car.image_url)}
                      alt={`${car.brand} ${car.name}`}
                      className="table-thumb"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{car.brand}</td>
                <td>{car.name}</td>
                <td>{car.year}</td>
                <td>{car.price_per_day}€</td>
                <td>
                  <button onClick={() => handleEdit(car)} className="btn-edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
