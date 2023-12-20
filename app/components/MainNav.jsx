import { NavLink } from "@remix-run/react";

const MainNav = () => {
  return (
    <nav className="bg-body-tertiary">
      <ul className="list-unstyled d-flex justify-content-center mb-5 gap-5 py-4">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/notes" className="nav-link">
            Notes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/blog" className="nav-link">
            Blog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
