import { Link, useLocation } from "react-router-dom";

function Aside() {
  const { pathname } = useLocation();

  return (
    <aside style={{ minHeight: "calc(100vh - 56px)" }} className="bg-dark p-4">
      <nav className="bg-dark">
        <div className="d-flex flex-column gap-2">
          <Link
            to="/start"
            className={`btn ${
              pathname === "/start" ? "btn-primary" : "btn-light"
            } px-4`}
          >
            Start
          </Link>
          <Link
            to="/quizy"
            className={`btn ${
              pathname === "/quizy" ? "btn-primary" : "btn-light"
            } px-4`}
          >
            Quizy
          </Link>
          <Link
            to="/courses"
            className={`btn ${
              pathname === "/courses" ? "btn-primary" : "btn-light"
            } px-4`}
          >
            Kursy
          </Link>
          <Link
            to="/dodaj"
            className={`btn btn-success px-4 mt-3`}
          >
            Dodaj
          </Link>
        </div>
      </nav>
    </aside>
  );
}

export default Aside;
