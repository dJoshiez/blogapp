import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://blogapp-l202.onrender.com/api/blog/");
        const data = await res.json();

        if (res.ok) {
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography>Loading blogs...</Typography>
      </Box>
    );
  }

  if (!isLoggedIn) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6">
          You need to register or login to post blogs
        </Typography>
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Typography variant="h6">No blogs yet</Typography>
        <Typography>
          Be the first one to write a blog ✍️
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        gap: 3,
        py: 2,
      }}
    >
      {posts.map((post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </Box>
  );
};

export default DisplayPost;
