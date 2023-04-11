import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [auth, setAuth] = useAuth();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          email: login.email,
          password: login.password,
          returnSecureToken: true,
        }
      );
      setAuth({
        token: res.data.idToken,
        userId: res.data.localId,
        email: res.data.email,
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data.error.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Logowanie</h1>
      <form onSubmit={submit}>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="mt-3">
          <label className="form-label">Email</label>
          <input
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            type="email"
            className="form-control"
          />
        </div>
        <div className="mt-3">
          <label className="form-label">Hasło</label>
          <input
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            type="password"
            className="form-control"
          />
        </div>
        {loading ? (
          <button className="btn btn-primary mt-3" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Ładowanie...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary mt-3">
            Zaloguj
          </button>
        )}
      </form>
    </section>
  );
}

export default Login;
