import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData, useRouteError, Outlet } from "@remix-run/react";
import { getStoredNotes, writeNotes } from "../data/notes";
import NoteLists from "../components/NoteLists";
import NoteForm, { links as FormStyle } from "../components/NoteForm";
import NoteStyle from "../styles/notes.css";

const Notes = () => {
  const data = useLoaderData();

  return (
    <main className="container">
      <div className="mt-5">
        <NoteForm />
        <NoteLists notes={data} />
      </div>
    </main>
  );
};

export default Notes;

export const links = () => [
  ...FormStyle(),
  { rel: "stylesheet", href: NoteStyle },
];

export async function action({ request }) {
  const body = await request.formData();
  // const notes = {
  //   title: body.get("title"),
  //   content: body.get("content"),
  // };

  const noteData = Object.fromEntries(body);
  noteData.id = Math.floor(Math.random() * 1000);
  noteData.createdAt = new Date().toISOString();

  if (noteData.title.trim().length < 5) {
    return { message: "Title must be at least 5 characters!" };
  }

  const existingNotes = await getStoredNotes();
  const updateNotes = existingNotes.concat(noteData);
  await writeNotes(updateNotes);

  // delay and showing loader or spinner or text
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, 1000)
  );

  return redirect(`/notes`);
}

export const loader = async () => {
  const notes = await getStoredNotes();
  if (!notes || notes.length == 0) {
    throw json(
      { message: "Couldn't find any notes." },
      {
        status: 404,
        statusText: "Not found",
      }
    );
  }

  return notes;

  // return new Response(JSON.stringify(notes), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // return json(notes);
};

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <main className="container">
      <NoteForm />
      <div className="card bg-danger-subtle">
        <div className="card-body">
          <h2 className="card-title">An error related to notes occurred!</h2>
          {error?.status && (
            <h4 className="text-danger">
              {error.status} {error.statusText}
            </h4>
          )}
          {error?.data?.message && <p>{error.data.message}</p>}
          <Link to="/" className="btn btn-primary">
            Back Safety
          </Link>
        </div>
      </div>
    </main>
  );
}

export function meta({ data }) {
  return [
    { title: "All Notes" },
    {
      name: "description",
      content: "Manage your notes with ease",
    },
  ];
}
