import { Outlet } from "@remix-run/react";

const Blog = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};

export default Blog;
