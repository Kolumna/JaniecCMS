import { Link } from "react-router-dom";
import logo from "../../assets/logoIcon.svg";
import useAuth from "../../hooks/useAuth";

function Header() {
  const [auth, setAuth] = useAuth();

  return (
    <nav className="navbar bg-body-tertiary navbar-dark bg-dark p-2">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-1">
          <span style={{ fontWeight: 700, fontSize: 30 }}>EXAMIE</span>
          <img src={logo} width={30} />
          <span style={{ fontWeight: 200, fontSize: 30 }}>CMS</span>
        </Link>
        <div>
          {auth && (
            <span className="navbar-text">
              Zalogowano jako <Link to="#">{auth.email}</Link>
            </span>
          )}
          {auth && (
            <button onClick={() => setAuth(null)} className="btn btn-dark ms-3">
              Wyloguj
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
