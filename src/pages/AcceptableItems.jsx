import React from "react";
import "../css/acceptableItems.css";
import Navbar from "../components/Navbar";

export default function AcceptableItems() {
  // List of acceptable donation items (ARRAY HO)
  const donationItems = [
    {
      title: "Clothing",
      image: "/images/clothes.webp",
      description:
        "Includes clothing for women, men, and children: purses, belts, ties, wallets, dresses, shirts, pants, and shoes.",
    },
    {
      title: "Household Items",
      image: "/images/kitchen.webp",
      description:
        "Kitchen items, small appliances, bedding, linens, pillows, curtains, rugs, jewelry, cosmetics, and home decor.",
    },
    {
      title: "Toys",
      image: "/images/toys.webp",
      description:
        "Stuffed animals, board games, dolls, action figures, and sporting goods.",
    },
    {
      title: "Electronics",
      image: "/images/playstatin.webp",
      description:
        "Gaming consoles, computers, laptops, monitors, DVD players, cameras, and small electronics. (No TVs)",
    },
    {
      title: "Books",
      image: "/images/books.webp",
      description:
        "All types of books including hardcovers, paperbacks, fiction, non-fiction, and e-readers.",
    },
    {
      title: "Equipment",
      image: "/images/small-weights.webp",
      description:
        "Exercise equipment, sporting gear, tools, and yard tools (excluding fuel-powered items).",
    },
    {
      title: "Small Furniture",
      image: "/images/books.webp",
      description:
        "Mirrors, nightstands, headboards, office chairs, and other small home furnishings.",
    },
    {
      title: "Miscellaneous",
      image: "/images/guitar.webp",
      description:
        "Bicycles, musical instruments, small filing cabinets, and various small appliances.",
    },
  ];

  return (
    <>
      <Navbar />
      <section className="acceptable-items">
        <div className="container">
          <h2 className="section-title">List of Acceptable Donations</h2>
          <div className="items-grid">
            {donationItems.map((item, index) => (
              <div key={index} className="item-card">
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
