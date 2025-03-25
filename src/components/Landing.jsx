import "../css/landing.css";
import main from "../assets/map.svg"; // Make sure to add the map SVG to your assets
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Install react-icons if not already installed

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-inner">
        {/* Header Section */}
        <div className="landing-header">
          <div className="header-content">
            <h2 className="main-title">
              Donate Clothing and Other Items to Charity
              <br />- Enjoy FREE Donation Pick-Up Over the World!
            </h2>
          </div>
        </div>

        {/* Description Section */}
        <div className="landing-description">
          <div className="description-content">
            <div className="description-text">
              <p>
                Did you know that some charities will send a truck right to your
                doorstep to pick up your donations of used clothing and
                household items? SoftRiseup links donors like you with these
                charities, offering a free donation pickup service. These
                organizations gladly accept a wide range of donations, including
                clothing, furniture, toys, shoes, and various household items,
                and more!{" "}
                <span
                  className="view-acceptable-items"
                  onClick={() => navigate("/acceptable-items")}
                >
                  View Acceptable Items →
                </span>
              </p>
            </div>
            <div className="map-container">
              <img src={main} alt="Coverage Map" className="coverage-map" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-container">
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-box">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <div className="feature-content">
                <h3>Maximize Your Tax Benefits with Donation!</h3>
                <p>
                  Transform your charitable contributions into tax deductions by
                  donating items like clothing, shoes, furniture, and other
                  household goods. Reduce your tax bill while supporting
                  charitable causes by donating non-cash items!
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-box">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <div className="feature-content">
                <h3>
                  Embrace Eco-Friendly <br />
                  Giving
                </h3>
                <p>
                  By donating your pre-loved clothing and household items,
                  you're not just giving to charity – you're keeping these items
                  out of landfills. Your donations support deserving charities
                  and promote environmental sustainability.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-box">
              <div className="feature-icon">
                <FaCheckCircle />
              </div>
              <div className="feature-content">
                <h3>
                  Declutter and Contribute
                  <br /> to a Good Cause
                </h3>
                <p>
                  Clear out your closets and garages by donating today! Your
                  contributions not only help you get organized but also
                  significantly impact various deserving charities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
