import React, { useEffect, useState } from "react";
import "../css/PostsPage.css";

function PostsPage() {
  const [posts, setPosts] = useState([]);

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
                        alt="Uploaded"
                        width="100"
                        height="100"
                        className="post-image"
                      />
                    ))}
                  </div>
                )}
                <button
                  className="approve-button"
                  onClick={() => approvePost(index)}
                >
                  Approve
                </button>
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
