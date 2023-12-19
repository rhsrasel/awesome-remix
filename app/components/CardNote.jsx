import moment from "moment";
import { Link } from "@remix-run/react";

const CardNote = ({ note, index }) => {
  const { title, content, createdAt } = note;
  const id = note.id.toString();

  return (
    <div className="card bg-warning-subtle">
      <div className="card-body d-flex justify-content-between bg-warning py-2">
        <p className="card-title fw-bold m-0">#{index + 1}</p>
        <time className="card-text fw-bold">
          {/* {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")} */}
          {new Date(createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
      <hr className="m-0" />
      <div className="card-body">
        <h5 className="card-title">
          <Link
            className="fw-bold text-danger-emphasis text-decoration-none"
            to={id}
          >
            {title}
          </Link>
        </h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default CardNote;
