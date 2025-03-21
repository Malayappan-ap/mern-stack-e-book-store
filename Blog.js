import React from "react";
import "./Blog.css";

const blogArticles = [
  {
    title: "The Benefits of Reading Regularly",
    link: "https://markhampubliclibrary.ca/blogs/post/top-10-benefits-of-reading-for-all-ages/",
  },
  {
    title: "Why You Should Read Fiction Books",
    link: "https://markmanson.net/read-fiction",
  },
  {
    title: "Top 10 Books for Personal Growth",
    link: "https://www.goodreads.com/list/show/152245.The_Greatest_Books_for_Personal_Growth_Self_Development_",
  },
  {
    title: "How Reading Improves Your Mental Health",
    link: "https://mhfaengland.org/mhfa-centre/blog/reading-good-mental-health/",
  },
  {
    title: "Reading and Its Positive Impact on Your Brain",
    link: "https://kwikbrain.medium.com/10-brain-reasons-to-make-reading-a-habit-aa628d4b498c",
  },
];

const Blog = () => {
  return (
    <div className="blog-container">
      <h1 className="blog-header">Blog Articles on Reading</h1>
      <div className="blog-list">
        {blogArticles.map((article, index) => (
          <div key={index} className="blog-item">
            <h2>{article.title}</h2>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
