import fs from "fs/promises";

export async function getStoredNotes() {
  const raw = await fs.readFile("notes.json", { encoding: "utf-8" });
  const data = JSON.parse(raw);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

export function writeNotes(note) {
  return fs.writeFile("notes.json", JSON.stringify({ notes: note || [] }));
}
