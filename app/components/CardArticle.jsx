import { Link } from "@remix-run/react";

const CardArticle = ({ article }) => {
  const { title, body } = article;
  const id = article.id.toString();

  return (
    <div className="card bg-warning-subtle">
      <div className="card-body">
        <h5 className="card-title">
          <Link
            className="fw-bold text-danger-emphasis text-decoration-none"
            to={id}
          >
            {id}# {title}
          </Link>
        </h5>
        <p className="card-text">{body}</p>
      </div>
    </div>
  );
};

export default CardArticle;
