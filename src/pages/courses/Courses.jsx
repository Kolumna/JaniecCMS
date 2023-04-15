import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nestedObjectToArray } from "../../helpers/nestedObject";
import useAuth from "../../hooks/useAuth";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();

  const getCourses = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://examie-default-rtdb.europe-west1.firebasedatabase.app/courses.json"
    );
    setCourses(nestedObjectToArray(res.data));
    setLoading(false);
  };

  const deleteCourse = async (name) => {
    await axios.delete(
      `https://examie-default-rtdb.europe-west1.firebasedatabase.app/courses/${name}.json?auth=${
        auth?.userId === import.meta.env.VITE_PERMISSION ? auth.token : ""
      }`
    );
    getCourses();
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>
          <h1>Kursy</h1>
          <Link to="/courses/add" className="btn btn-success mt-3">
            Dodaj kurs
          </Link>
          <table className="table mt-3">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Ilość lekcji</th>
                <th scope="col">Data ostatniej edycji</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.modules.length}</td>
                  <td>{course.editDate ?? course.date}</td>
                  <td>
                    <Link
                      to={`https://examie.pl/learning/${course.name.toLowerCase()}`}
                      target="_blank"
                      className="btn btn-primary"
                    >
                      Zobacz
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/courses/edit/${course.name.toLowerCase()}/${
                        course._id
                      }`}
                      className="btn btn-warning"
                    >
                      Edytuj
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteCourse(course.name.toLowerCase())}
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

export default Courses;
