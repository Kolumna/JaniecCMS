import axios from "axios";
import { useEffect, useState } from "react";
import { objectToArrayWithId } from "../../helpers/object";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://examie-default-rtdb.europe-west1.firebasedatabase.app/courses.json"
    );
    setCourses(objectToArrayWithId(res.data));
    setLoading(false);
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
          <Link to="/courses/add" className="btn btn-success mt-3">Dodaj kurs</Link>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Ilość lekcji</th>
                <th scope="col">Data utworzenia</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.modules.length}</td>
                  <td>{course.date}</td>
                  <td>
                    <button className="btn btn-primary">Zobacz</button>
                  </td>
                  <td>
                    <button className="btn btn-warning">Edytuj</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Usuń</button>
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
