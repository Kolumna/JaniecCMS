import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AddQuiz() {
  const [quiz, setQuiz] = useState({
    baza: "inf03",
    title: "",
    img: "",
    values: [
      {
        name: "",
        correct: false,
      },
      {
        name: "",
        correct: false,
      },
      {
        name: "",
        correct: false,
      },
      {
        name: "",
        correct: false,
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `https://examie-default-rtdb.europe-west1.firebasedatabase.app/quizes/${
          quiz.baza
        }.json?auth=${
          auth?.userId === import.meta.env.VITE_PERMISSION ? auth.token : ""
        }`,
        JSON.stringify(quiz)
      );
      navigate("/quizy");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const answerHanlder = (e, index) => {
    const newValues = [...quiz.values];
    newValues[index].name = e.target.value;
    setQuiz({ ...quiz, values: newValues });
  };

  const checkboxHandler = (e, index) => {
    const newValues = [...quiz.values];
    newValues[index].correct = e.target.checked ? true : false;
    setQuiz({ ...quiz, values: newValues });
  };

  return (
    <section style={{ width: "100%" }}>
      <h1>Dodaj Quiz</h1>
      {error && (
        <div className="alert alert-danger mt-3">Nie masz permisji!!</div>
      )}
      <form onSubmit={submit}>
        <div className="mb-3 mt-3">
          <label className="form-label">Baza</label>
          <select className="form-select">
            <option value="inf03">INF03</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Nazwa</label>
          <input
            onChange={(e) => {
              setQuiz({ ...quiz, title: e.target.value });
            }}
            value={quiz.title}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Zdjęcie(link)</label>
          <input
            onChange={(e) => {
              setQuiz({ ...quiz, img: e.target.value });
            }}
            type="text"
            className="form-control"
          />
          <img className="mt-4" width={200} src={quiz.img} />
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Odpowiedzi</h5>
            <label className="form-label mt-2">Odpowiedź 1</label>
            <div className="input-group mb-3">
              <div className="input-group-text">
                <input
                  onChange={(e) => checkboxHandler(e, 0)}
                  className="form-check-input mt-0"
                  type="checkbox"
                />
              </div>
              <input
                onChange={(e) => answerHanlder(e, 0)}
                type="text"
                className="form-control"
              />
            </div>
            <label className="form-label mt-2">Odpowiedź 2</label>
            <div className="input-group mb-3">
              <div className="input-group-text">
                <input
                  onChange={(e) => checkboxHandler(e, 1)}
                  className="form-check-input mt-0"
                  type="checkbox"
                />
              </div>
              <input
                onChange={(e) => answerHanlder(e, 1)}
                type="text"
                className="form-control"
              />
            </div>
            <label className="form-label mt-2">Odpowiedź 3</label>
            <div className="input-group mb-3">
              <div className="input-group-text">
                <input
                  onChange={(e) => checkboxHandler(e, 2)}
                  className="form-check-input mt-0"
                  type="checkbox"
                />
              </div>
              <input
                onChange={(e) => answerHanlder(e, 2)}
                type="text"
                className="form-control"
              />
            </div>
            <label className="form-label mt-2">Odpowiedź 4</label>
            <div className="input-group mb-3">
              <div className="input-group-text">
                <input
                  onChange={(e) => checkboxHandler(e, 3)}
                  className="form-check-input mt-0"
                  type="checkbox"
                />
              </div>
              <input
                onChange={(e) => answerHanlder(e, 3)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="mb-3 form-check"></div>
        {loading ? (
          <button className="btn btn-primary" type="submit" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Dodawanie...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Dodaj
          </button>
        )}
      </form>
    </section>
  );
}

export default AddQuiz;
