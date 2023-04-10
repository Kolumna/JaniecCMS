import { Link } from "react-router-dom";

function Add() {
  return (
    <section>
      <h1>Dodawanie</h1>
      <div className="card mt-5">
        <div className="card-header">Quizy</div>
        <div className="card-body">
          <h5 className="card-title">Dodaj Quiz</h5>
          <p className="card-text">Stan quizów: undifined</p>
          <Link to="/quizy/add" className="btn btn-primary">
            Przejdź
          </Link>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header">Kursy</div>
        <div className="card-body">
          <h5 className="card-title">Dodaj Kurs</h5>
          <p className="card-text">Stan kursów: undifined</p>
          <Link to="/courses/add" className="btn btn-primary">
            Przejdź
          </Link>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-header">Kwalifikacje</div>
        <div className="card-body">
          <h5 className="card-title">Dodaj Kwalifikację</h5>
          <p className="card-text">Stan kwalifikacji: undifined</p>
          <Link to="#" className="btn btn-primary">
            Przejdź
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Add;
