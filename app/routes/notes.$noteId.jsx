import { json } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import { getStoredNotes } from "../data/notes";

const NoteId = () => {
  const note = useLoaderData();

  return (
    <main className="container">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Link to="/notes" className="btn btn-primary mt-3">
        Back to All Notes
      </Link>
    </main>
  );
};

export default NoteId;

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const note = notes.find((note) => note.id == noteId);
  if (!note) {
    throw json(
      { message: "Couldn't find the note for id: " + noteId },
      {
        status: 404,
        statusText: "Not found",
      }
    );
  }
  return note;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <main className="container">
      <p>{error?.data?.message}</p>
      <Link to="/notes" className="btn btn-primary mt-3">
        Back to All Notes
      </Link>
    </main>
  );
}

export function meta({ data }) {
  return [
    {
      title: data.title,
    },
    {
      name: "description",
      content: data.content,
    },
  ];
}
