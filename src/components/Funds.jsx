import React, { useState, useEffect, useRef } from "react";
import "../css/funds.css";

export default function Funds() {
  const isMobile = window.innerWidth <= 768;
  const [itemsCount, setItemsCount] = useState(0);
  const [familiesCount, setFamiliesCount] = useState(0);
  const [donorsCount, setDonorsCount] = useState(0);
  const [locationsCount, setLocationsCount] = useState(0);
  const countersRef = useRef(null);

  const animateValue = (start, end, duration, setter) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const handleScroll = () => {
    if (!countersRef.current) return;
    const rect = countersRef.current.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      animateValue(0, 50000, 2000, setItemsCount); // Items donated
      animateValue(0, 10000, 2000, setFamiliesCount); // Families helped
      animateValue(0, 5000, 2000, setDonorsCount); // Active donors
      animateValue(0, 100, 2000, setLocationsCount); // Pickup locations
      window.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="funds" ref={countersRef}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="facts-item">
              <svg
                height={isMobile ? 40 : 80}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#FFD43B"
                  d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                />
              </svg>
              <div className="facts-text">
                <h3 className="facts-plus">{itemsCount}</h3>
                <p>Items Donated</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="facts-item">
              <svg
                height={isMobile ? 40 : 80}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#FFD43B"
                  d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-77.5c-6.6-10.6-20.3-13.9-30.9-7.3s-13.9 20.3-7.3 30.9l33.8 54.1c6.6 10.6 20.3 13.9 30.9 7.3s13.9-20.3 7.3-30.9L384 512V248c72.6-12.3 126.7-67.7 135.2-131.6c1-7.2-4.6-13.7-11.8-14.8l-59.3-8.9c-7.2-1-13.7 4.6-14.8 11.8l-1.8 13.1c-10.5 74.6-74.1 131.3-149.6 131.3s-139.1-56.7-149.6-131.3l-1.8-13.1c-1-7.2-7.6-12.8-14.8-11.8l-59.3 8.9c-7.2 1-12.8 7.6-11.8 14.8C53.2 180.3 107.4 235.7 180 248z"
                />
              </svg>
              <div className="facts-text">
                <h3 className="facts-plus">{familiesCount}</h3>
                <p>Families Helped</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="facts-item">
              <svg
                height={isMobile ? 35 : 70}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#FFD43B"
                  d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"
                />
              </svg>
              <div className="facts-text">
                <h3 className="facts-plus">{donorsCount}</h3>
                <p>Active Donors</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="facts-item">
              <svg
                height={isMobile ? 35 : 70}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="#FFD43B"
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                />
              </svg>
              <div className="facts-text">
                <h3 className="facts-plus">{locationsCount}</h3>
                <p>Pickup Locations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
