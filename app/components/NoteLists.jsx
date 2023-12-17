import CardNote from "./CardNote";

const NoteLists = ({ notes }) => {
  return (
    <div className="notelist mb-5 pb-5">
      <div className="row justify-content-center">
        {notes.map((note, index) => (
          <div className="col-sm-6 col-lg-4 mt-4" key={note.id}>
            <CardNote note={note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteLists;
