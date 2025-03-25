import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/FormPage.css";

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    itemName: "",
    category: "",
    age: "",
    condition: "",
    description: "",
    images: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert images to base64 for local storage
    Promise.all(
      formData.images.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    ).then((base64Images) => {
      const newPost = { ...formData, images: base64Images, approved: false };
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      localStorage.setItem("posts", JSON.stringify([...posts, newPost]));

      // Show sweet alert and then redirect
      Swal.fire({
        title: "Thank You!",
        text: "Your donation is greatly appreciated. Please wait patiently while our admin reviews your donation request.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#2ecc71",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/"); // Redirect to homepage
        }
      });
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Item Name:</label>
          <input
            className="form-control"
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category:</label>
          <select
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Item Age (Years):</label>
          <input
            className="form-control"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Condition:</label>
          <select
            className="form-control"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Images:</label>
          <input
            className="form-control"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.images.length > 0 && (
            <div className="image-preview">
              {formData.images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormPage;
