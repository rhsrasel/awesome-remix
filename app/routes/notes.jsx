import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoredNotes, writeNotes } from "../data/notes";
import NoteLists from "../components/NoteLists";
import NoteForm, { links as FormStyle } from "../components/NoteForm";
import NoteStyle from "../styles/notes.css";

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
  noteData.id = new Date().toISOString();

  const existingNotes = await getStoredNotes();
  const updateNotes = existingNotes.concat(noteData);
  await writeNotes(updateNotes);

  // delay showing loader spinner/text
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, 2000)
  );

  return redirect(`/notes`);
}

export const loader = async () => {
  const notes = await getStoredNotes();

  return notes;

  // return new Response(JSON.stringify(notes), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // return json(notes);
};

const Notes = () => {
  const data = useLoaderData();

  return (
    <main>
      <div className="container">
        <h1 className="note-heading text-center display-1">My Notes</h1>
        <div className="mt-5">
          <NoteForm />
          <NoteLists notes={data} />
        </div>
      </div>
    </main>
  );
};

export default Notes;
