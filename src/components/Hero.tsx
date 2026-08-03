import React from "react";

function Hero() {
  const scrollToCatalogue = () => {
    const catalogueSection = document.getElementById("featured-cars");
    if (catalogueSection) {
      catalogueSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="l1">
        <h1>Rent the classic</h1>
        <h2>Cruise the coast in a vintage convertible.</h2>
        <button className="l-btn" onClick={scrollToCatalogue}>
          View Catalogue
        </button>
      </div>
    </div>
  );
}

export default Hero;