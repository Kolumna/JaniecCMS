import axios from "axios";
import { useEffect, useState } from "react";
import { objectToArrayWithId } from "../../helpers/object";
import { Link } from "react-router-dom";

function Quizy() {
  const [quizy, setQuizy] = useState([]);
  const [loading, setLoading] = useState(true);

  const getQuizy = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://examie-default-rtdb.europe-west1.firebasedatabase.app/quizes/inf03.json"
    );
    setQuizy(objectToArrayWithId(res.data));
    setLoading(false);
  };

  const deleteQuiz = async (id) => {
    await axios.delete(
      `https://examie-default-rtdb.europe-west1.firebasedatabase.app/quizes/inf03/${id}.json?auth=${
        quiz.baza
      }.json?auth=${
        auth?.userId === import.meta.env.VITE_PERMISSION ? auth.token : ""
      }`
    );
    getQuizy();
  };

  useEffect(() => {
    getQuizy();
  }, []);

  return (
    <section>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h1>Quizy</h1>
          <Link to="/quizy/add" className="btn btn-success mt-3">
            Dodaj quiz
          </Link>
          <ul className="nav nav-tabs mt-3">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                INF02
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                INF03
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " aria-current="page" href="#">
                INF04
              </a>
            </li>
          </ul>
          <table className="table text-start mt-3">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nazwa</th>
                <th scope="col">Ilość odpowiedzi</th>
              </tr>
            </thead>
            <tbody>
              {quizy.map((quiz, index) => (
                <tr key={quiz._id}>
                  <td>{index}</td>
                  <td>
                    {quiz.title}{" "}
                    {quiz.img && (
                      <span class="badge bg-secondary">Zdjęcie</span>
                    )}
                  </td>
                  <td>{quiz.values.length}</td>
                  <td>
                    <Link
                      to={`/quizy/edit/${quiz._id}`}
                      className="btn btn-warning"
                    >
                      Edytuj
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteQuiz(quiz._id)}
                      className="btn btn-danger"
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Quizy;
