import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config/config";
import Swal from "sweetalert2";

export default function DonationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "",
    donorName: "",
    contactInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add loading state
      Swal.fire({
        title: "Submitting...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      console.log("Submitting to:", `${config.API_URL}/donations`);
      console.log("Form data:", formData);

      const response = await axios.post(`${config.API_URL}/donations`, {
        title: formData.title,
        description: formData.description,
        condition: formData.condition,
        donor_name: formData.donorName, // Match database column name
        contact_info: formData.contactInfo, // Match database column name
      });

      console.log("Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your donation has been submitted successfully.",
      });

      navigate("/listed-items");
    } catch (error) {
      console.error("Full error object:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to submit donation: ${
          error.response?.data?.error || error.message
        }`,
        footer: `Status: ${error.response?.status || "Unknown"}`,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Donate an Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="condition" className="form-label">
            Condition
          </label>
          <input
            type="text"
            className="form-control"
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="donorName" className="form-label">
            Donor Name
          </label>
          <input
            type="text"
            className="form-control"
            id="donorName"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactInfo" className="form-label">
            Contact Information
          </label>
          <input
            type="text"
            className="form-control"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Donation
        </button>
      </form>
    </div>
  );
}
