import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1">
          React Boilerplate
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">Check the Context in action</button>
          </Link>
          {/* Botón para ir a la lista de contactos */}
          <Link to="/contacts">
            <button className="btn btn-secondary ml-2">Contact List</button>
          </Link>
        </div>
      <button>x</button>
      </div>
    </nav>
  );
};
