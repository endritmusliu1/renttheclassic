import React from 'react'
import './FeaturedInfo.css'
import car1 from '../../assets/car1.jpg'
import car2 from '../../assets/car2.jpg'
import car3 from '../../assets/car3.jpg'

const FeaturedInfo = () => {
  return (
    <section className="featured-section">
      <h2 className="featured-title l1">What we offer:</h2>
      
      <div className="cards-container">
        <div className="card">
          <img src={car1} alt="Rental Car Front View" />
          <div className="card-info">
            <h3>Luxury</h3>
            <h2>Timeless Elegance, Redefined</h2>
            <p>Step inside a masterpiece of automotive history. Our luxury classic collection offers more than just a ride.  It delivers an era of unmatched prestige, exquisite craftsmanship, and sophisticated style that turns every head on the street. Experience pure vintage grandeur.</p>
          </div>
        </div>
        <div className="card">
          <img src={car2} alt="Rental Car Side View" />
          <div className="card-info">
            <h3>Comodity</h3>
            <h2 style={{fontSize:'22px'}}>Vintage Charm, Everyday Convenience</h2>
            <p>Who says classic can't be practical? Enjoy the perfect blend of nostalgic character and reliable, effortless cruising. These beautifully maintained classics are ready for your daily adventures, weekend getaways, or special occasions, making premium vintage driving completely accessible.</p>
          </div>
        </div>
        <div className="card">
          <img src={car3} alt="Rental Car Rear View" />
          <div className="card-info">
            <h3>Performance</h3>
            <h2>Raw Power, Pure Heritage</h2>
            <p>Feel the mechanical soul of a true classic. Built for enthusiasts who crave the visceral roar of a vintage engine and the authentic feel of the asphalt, our performance classics deliver an exhilarating, driver-focused experience that modern cars simply cannot replicate.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedInfo