import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
  return note;
}
