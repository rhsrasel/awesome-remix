import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useSubmit,
  useNavigation,
} from "@remix-run/react";
import CardArticle from "../components/CardArticle";
import { getArticles } from "../data/articles";

const BlogList = () => {
  const { articles, q } = useLoaderData();

  const submit = useSubmit();
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <div className="blog-lists">
      <Form
        id="search-form"
        role="search"
        onChange={(event) => {
          const isFirstSearch = q === null;
          submit(event.currentTarget, {
            replace: !isFirstSearch,
          });
        }}
      >
        <input
          className="form-control"
          aria-label="Search articles"
          id="q"
          name="q"
          placeholder="Search by ID"
          type="search"
        />
        <div aria-hidden hidden={!searching} className="spinner my-3">
          Loading...
        </div>
      </Form>

      <ul className="list-unstyled row">
        {articles.map((article) => (
          <li className="col-12 col-md-6 col-lg-4 mt-4" key={article.id}>
            <CardArticle article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const articles = await getArticles(q);

  return json({ articles, q });
};
