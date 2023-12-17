import { NavLink } from "@remix-run/react";

export const meta = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <main>
      <div className="container">
        <div className="text-center">
          <h1 className="h1">Create and Track Your Notes</h1>
          <p className="text">
            Try our app and never loos track of your notes again!
          </p>
          <NavLink to="/notes" className="btn btn-warning py-2 px-5">
            Try Now!
          </NavLink>
        </div>
      </div>
    </main>
  );
}
