import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import PageHeader from "../components/PageHeader";
import "../css/listedItems.css";

// export default function ListedItems() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/donations");
//         setItems(response.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchItems();
//   }, []);

//   const handleImageError = (e) => {
//     e.target.onerror = null; // hawa infinite loop hudaina
//     e.target.src =
//       "https://via.placeholder.com/300x200?text=Item+Image+Not+Found";
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <>
//       <Navbar />
//       <PageHeader title="Listed Items" path="/listed-items" />

//       <div className="listed-items-container">
//         <div className="items-grid">
//           {items.map((item) => (
//             <div key={item.id} className="item-card">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="item-image"
//                 onError={handleImageError}
//               />
//               <div className="item-content">
//                 <h3>{item.title}</h3>
//                 <p>{item.description}</p>
//                 <div className="item-details">
//                   <p>
//                     <i className="fas fa-user"></i>
//                     <strong>Donor:</strong> {item.donor_name}
//                   </p>
//                   <p>
//                     <i className="fas fa-tag"></i>
//                     <strong>Category:</strong> {item.category}
//                   </p>
//                   <p>
//                     <i className="fas fa-clock"></i>
//                     <strong>Age:</strong> {item.itemAge}
//                   </p>
//                   <p>
//                     <i className="fas fa-star"></i>
//                     <strong>Condition:</strong>
//                     <span
//                       className={`condition-badge ${item.condition.toLowerCase()}`}
//                     >
//                       {item.condition}
//                     </span>
//                   </p>
//                   <p>
//                     <i className="fas fa-phone"></i>
//                     <strong>Contact:</strong> {item.contact_info}
//                   </p>
//                 </div>
//                 <button className="request-btn">Request Item</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//       <BackToTop />
//     </>
//   );
// }

function ListedItems() {
  const [approvedPosts, setApprovedPosts] = useState([]);

  useEffect(() => {
    // Fetch only approved posts from localStorage
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    const filteredPosts = data.filter((post) => post.approved);
    setApprovedPosts(filteredPosts);
  }, []);

  return (
    <div>
      <h2>Listed Items</h2>
      {approvedPosts.length > 0 ? (
        approvedPosts.map((post, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.itemName}</h3>
            <p>
              <strong>Category:</strong> {post.category}
            </p>
            <p>
              <strong>Condition:</strong> {post.condition}
            </p>
            <p>
              <strong>Age:</strong> {post.age} years
            </p>
            <p>
              <strong>Description:</strong> {post.description}
            </p>
            {post.images.length > 0 &&
              post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Uploaded"
                  width="100"
                  height="100"
                  style={{ marginRight: "10px" }}
                />
              ))}
          </div>
        ))
      ) : (
        <p>No approved items listed yet.</p>
      )}
    </div>
  );
}

export default ListedItems;
