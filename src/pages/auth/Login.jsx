function Login() {
  return (
    <section>
      <h1>Logowanie</h1>
      <form>
        <div className="mt-3">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mt-3">
          <label for="exampleInputPassword1" className="form-label">
            Hasło
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mt-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
            Zapamiętaj mnie
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Zaloguj
        </button>
      </form>
    </section>
  );
}

export default Login;
