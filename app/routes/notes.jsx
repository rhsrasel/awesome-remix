import { Outlet } from "@remix-run/react";
import { links as FormStyle } from "../components/NoteForm";
import NoteStyle from "../styles/notes.css";

const Notes = () => {
  return <Outlet />;
};

export default Notes;

export const links = () => [
  ...FormStyle(),
  { rel: "stylesheet", href: NoteStyle },
];
