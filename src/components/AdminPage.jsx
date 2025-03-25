import React, { useState, useEffect } from "react";

function AdminPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(posts);
  }, []);

  const approvePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].approved = true;
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const rejectPost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1); // Remove the rejected post
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Posts Awaiting Approval</h3>
      {posts.length === 0 && <p>No posts submitted yet.</p>}
      <ul>
        {posts
          .filter((post) => !post.approved)
          .map((post, index) => (
            <li key={index}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => approvePost(index)}>Approve</button>
              <button onClick={() => rejectPost(index)}>Reject</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AdminPage;
