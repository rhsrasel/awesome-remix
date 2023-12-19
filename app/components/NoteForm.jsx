import { Form, useNavigation, useActionData } from "@remix-run/react";
import NoteFormStyles from "./noteform.css";

export const links = () => [{ rel: "stylesheet", href: NoteFormStyles }];

const NoteForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting";

  return (
    <>
      <h1 className="form-heading mb-4 text-center fw-bold">
        Create Your Own Note
      </h1>
      <Form method="post" id="note-form">
        {data?.message && <p className="text-danger fw-bold">{data.message}</p>}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" name="title" />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="6"
          ></textarea>
        </div>
        <div className="mt-4 mb-5">
          <button
            type="submit"
            className="btn btn-dark"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding note..." : "Add Note"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default NoteForm;
