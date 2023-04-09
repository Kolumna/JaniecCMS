import { Link, useLocation } from "react-router-dom";

function Aside() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <aside style={{ height: "calc(100vh - 56px)" }} className="bg-dark p-4">
      <nav class="bg-dark">
        <div class="d-flex flex-column gap-2">
          <Link
            to="/start"
            class={`btn ${
              pathname === "/start" ? "btn-primary" : "btn-light"
            } px-4`}
          >
            Start
          </Link>
          <Link
            to="/quizy"
            class={`btn ${
              pathname === "/quizy" ? "btn-primary" : "btn-light"
            } px-4`}
          >
            Quizy
          </Link>
          <Link
            to="/kursy"
            class={`btn ${
              pathname === "/kursy" ? "btn-primary" : "btn-light"
            } px-4`}
          >
            Kursy
          </Link>
          <Link
            to="/dodaj"
            class={`btn btn-success px-4`}
          >
            Dodaj
          </Link>
        </div>
      </nav>
    </aside>
  );
}

export default Aside;
