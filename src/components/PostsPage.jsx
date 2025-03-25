import React, { useEffect, useState } from "react";

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
    <div>
      <h2>Pending Posts</h2>
      {posts.length > 0 ? (
        posts.map(
          (post, index) =>
            !post.approved && (
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
                <br />
                <button onClick={() => approvePost(index)}>Approve</button>
              </div>
            )
        )
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}

export default PostsPage;
