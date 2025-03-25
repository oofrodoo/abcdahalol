import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../css/donate.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import PageHeader from "../components/PageHeader";
import { FaClock, FaListAlt, FaShoppingBasket } from "react-icons/fa";
import { donationApi } from "../utils/api";

const ITEM_CATEGORIES = [
  { value: "", label: "Select Item Type", disabled: true },
  { value: "clothes", label: "Clothes" },
  { value: "books", label: "Books" },
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "toys", label: "Toys" },
  { value: "others", label: "Others" },
];

const ITEM_CONDITIONS = [
  { value: "", label: "Select Condition", disabled: true },
  { value: "excellent", label: "Excellent - Like New" },
  { value: "good", label: "Good - Minor Wear" },
  { value: "fair", label: "Fair - Visible Wear" },
];

const TIME_UNITS = [
  { value: "", label: "Select Unit", disabled: true },
  { value: "months", label: "Months" },
  { value: "years", label: "Years" },
];

const DonationFormContent = ({
  onSubmit,
  formData,
  setFormData,
  isLoading,
}) => (
  <form onSubmit={onSubmit} className="donation-form">
    <FormInput
      label="Your Name"
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      required
    />

    <FormInput
      label="Your Email"
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      disabled={formData.showLogin}
      required
    />

    <FormInput
      label="Item Name"
      type="text"
      value={formData.itemName}
      onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
      required
    />

    <FormSelect
      label="Item Category"
      value={formData.itemCategory}
      onChange={(e) =>
        setFormData({ ...formData, itemCategory: e.target.value })
      }
      options={ITEM_CATEGORIES}
      required
    />

    <div className="age-input-group">
      <FormInput
        label="Item Age"
        type="number"
        value={formData.itemAge.value}
        onChange={(e) =>
          setFormData({
            ...formData,
            itemAge: { ...formData.itemAge, value: e.target.value },
          })
        }
        min="0"
        required
      />

      <FormSelect
        value={formData.itemAge.unit}
        onChange={(e) =>
          setFormData({
            ...formData,
            itemAge: { ...formData.itemAge, unit: e.target.value },
          })
        }
        options={TIME_UNITS}
      />
    </div>

    <FormSelect
      label="Item Condition"
      value={formData.itemCondition}
      onChange={(e) =>
        setFormData({ ...formData, itemCondition: e.target.value })
      }
      options={ITEM_CONDITIONS}
      required
    />

    <FormTextArea
      label="Item Description"
      value={formData.itemDescription}
      onChange={(e) =>
        setFormData({ ...formData, itemDescription: e.target.value })
      }
      required
    />

    <ImageUpload
      images={formData.itemImages}
      onImageChange={(images) =>
        setFormData({ ...formData, itemImages: images })
      }
    />

    <button type="submit" className="btn btn-custom" disabled={isLoading}>
      {isLoading ? "Submitting..." : "Submit Donation"}
    </button>
  </form>
);

const FormInput = ({ label, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <input className="form-control" {...props} />
  </div>
);

const FormSelect = ({ label, options, ...props }) => (
  <div className="form-group">
    {label && <label>{label}</label>}
    <select className="form-control" {...props}>
      {options.map(({ value, label, disabled }) => (
        <option key={value} value={value} disabled={disabled}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

const FormTextArea = ({ label, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <textarea className="form-control" rows="3" {...props} />
  </div>
);

const ImageUpload = ({ images, onImageChange }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      Swal.fire({
        icon: "error",
        title: "Too many images",
        text: "Please select maximum 4 images",
      });
      return;
    }

    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then(onImageChange);
  };

  return (
    <div className="form-group">
      <label>Upload Images</label>
      <input
        type="file"
        className="form-control"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        required
      />
      <small className="text-muted">Upload up to 4 images (Max 5MB each)</small>

      {images?.length > 0 && (
        <div className="image-preview">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Preview ${index + 1}`}
              className="preview-image"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemName: "",
    itemCategory: "",
    itemAge: { value: "", unit: "" },
    itemCondition: "",
    itemDescription: "",
    itemImages: [],
    showLogin: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Validate form data
      if (!formData.itemName || !formData.itemDescription) {
        throw new Error("Please fill in all required fields");
      }

      const response = await donationApi.createDonation(formData);
      console.log("Donation submitted:", response); // Debug log

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your donation has been submitted successfully.",
      });
      navigate("/listed-items");
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "Failed to submit donation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <PageHeader title="Donate Items" />
      <div className="container my-5">
        <DonationFormContent
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
        />
      </div>
      <Footer />
      <BackToTop />
    </>
  );
}
