import { json } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import { getArticles } from "../data/articles";

const Article = () => {
  const article = useLoaderData();
  console.log("article", article);

  return (
    <div className="article">
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <Link to="/blog" className="btn btn-primary mt-3">
        Back to Blog
      </Link>
    </div>
  );
};

export default Article;

export const loader = async ({ params }) => {
  const articles = await getArticles();
  const articleId = params.blogId;
  const article = articles.find((article) => article.id == articleId);

  if (!article || articles.length == 0) {
    throw json(
      { message: "Couldn't find the article for id: " + articleId },
      {
        status: 404,
        statusText: "Not found!",
      }
    );
  }

  return article;
};

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <main className="container">
      <p>{error?.data?.message}</p>
      <Link to="/blog" className="btn btn-primary mt-3">
        Back to Blog
      </Link>
    </main>
  );
}
