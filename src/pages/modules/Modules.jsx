import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nestedObjectToArray } from "../../helpers/nestedObject";
import useAuth from "../../hooks/useAuth";

function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  const getModules = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://examie-default-rtdb.europe-west1.firebasedatabase.app/modules/egzaminy-zawodowe/.json"
    );
    setModules(nestedObjectToArray(res.data));
    setLoading(false);
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <section>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h1>Moduły</h1>
          <Link to="/modules/add" className="btn btn-success mt-3">
            Dodaj moduł
          </Link>
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module._id}>
                  <td>{module.name}</td>
                  <td>
                    <Link
                      to={`https://examie.pl/modules/${module.name.toLowerCase()}`}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Zobacz
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/modules/edit/${course.name.toLowerCase()}/${
                        module._id
                      }`}
                      className="btn btn-warning"
                    >
                      Edytuj
                    </Link>
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

export default Modules;
