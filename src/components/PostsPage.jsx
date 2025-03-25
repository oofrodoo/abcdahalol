import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PostsPage.css";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts from localStorage
    const data = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(data);
  }, []);

  const approvePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].approved = true;
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    navigate("/listed-items"); // Redirect after approval
  };

  const rejectPost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1); // Remove the rejected post
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    navigate("/listed-items"); // Redirect after rejection
  };

  return (
    <div className="posts-container">
      <h2 className="posts-title">Pending Posts</h2>
      {posts.length > 0 ? (
        posts.map(
          (post, index) =>
            !post.approved && (
              <div key={index} className="post-card">
                <h3 className="post-title">{post.itemName}</h3>
                <p className="post-info">
                  <span className="post-label">Category:</span>
                  <span className="post-text">{post.category}</span>
                </p>
                <p className="post-info">
                  <span className="post-label">Condition:</span>
                  <span className="post-text">{post.condition}</span>
                </p>
                <p className="post-info">
                  <span className="post-label">Age:</span>
                  <span className="post-text">{post.age} years</span>
                </p>
                <p className="post-info">
                  <span className="post-label">Description:</span>
                  <span className="post-text">{post.description}</span>
                </p>
                {post.images.length > 0 && (
                  <div className="image-gallery">
                    {post.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${post.itemName} - Image ${i + 1}`}
                        className="post-image"
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                )}
                <div className="button-group">
                  <button
                    className="approve-button"
                    onClick={() => approvePost(index)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => rejectPost(index)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
        )
      ) : (
        <p className="no-posts">No posts available.</p>
      )}
    </div>
  );
}

export default PostsPage;
