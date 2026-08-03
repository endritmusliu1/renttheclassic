import Navbar from "./components/Navbar/Navbar"
import React, { useState } from "react"
import './App.css'
import Hero from "./components/Hero"
import FeaturedInfo from "./components/FeaturedInfo/FeaturedInfo"
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"
import Login from "./components/Login/Login"
import Signup from "./components/Login/Signup"
import FeaturedCars from "./components/FeaturedCars/FeaturedCars"
import Booking from "./components/Booking/Booking"
import MyBookings from "./components/MyBookings/MyBookings"
import AdminDashboard from "./components/Admin/AdminDashboard"
import AdminBookings from "./components/Admin/AdminBookings"
import Footer from "./components/Footer/Footer"

function App() {
  const [user, setUser] = useState<any>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAdmin = user && user.roles[0]?.name === "admin";

  return (
    <Router>
      <div>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={
              <div className="bg">
                <Hero />
                <FeaturedInfo />
                <FeaturedCars />
                <Footer />
              </div>
            }
          />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/booking/:carId"
            element={user ? <Booking /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/my-bookings"
            element={user ? <MyBookings /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />}
          />
          <Route
            path="/admin/bookings"
            element={isAdmin ? <AdminBookings /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
