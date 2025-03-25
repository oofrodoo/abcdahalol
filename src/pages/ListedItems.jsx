import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import PageHeader from "../components/PageHeader";
import "../css/listedItems.css";

function ListedItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const approvedItems = posts.filter((post) => post.approved);
    setItems(approvedItems);
  }, []);

  return (
    <>
      <Navbar />
      <PageHeader title="Listed Items" path="/listed-items" />

      <div className="listed-items-container">
        <h2>Listed Items</h2>
        <div className="items-grid">
          {items.map((item, index) => (
            <div key={index} className="item-card">
              {item.images.length > 0 && (
                <div className="item-images">
                  {item.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${item.itemName} - Image ${i + 1}`}
                      className="item-image"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
              )}
              <h3>{item.itemName}</h3>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Condition:</strong> {item.condition}
              </p>
              <p>
                <strong>Age:</strong> {item.age} years
              </p>
              <p>
                <strong>Description:</strong> {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}

export default ListedItems;
