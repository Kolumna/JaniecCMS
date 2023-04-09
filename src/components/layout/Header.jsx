import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar bg-body-tertiary navbar-dark bg-dark p-2" >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">EXAMIE CMS</Link>
        <span className="navbar-text">Zalogowano jako <Link to="#">K0lumna</Link></span>
      </div>
    </nav>
  );
}

export default Header;
