import { useState } from "react";

function AddCourse() {
  const [course, setCourse] = useState({
    name: "",
    modules: [
      {
        id: 0,
        name: "",
        paragraphs: [],
      },
    ],
  });

  const addLesson = (e) => {
    e.preventDefault();

    setCourse({
      ...course,
      modules: [
        ...course.modules,
        {
          id: course.modules.length,
          name: "",
          paragraphs: [{ id: 0, type: "", content: "" }],
        },
      ],
    });
  };

  const paragraphType = (e, id) => {
    e.preventDefault();

    const newParagraph = {
      id: course.modules[id].paragraphs.length,
      type: e.target.value,
      content: "",
    };

    switch (e.target.value) {
      case "Title":
        setCourse({
          });
        break;
    }
  };

  console.log(course);

  return (
    <section className="px-5" style={{ width: "100%" }}>
      <h1>Dodaj kurs</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nazwa kursu
          </label>
          <input
            type="text"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            className="form-control"
          />
        </div>
        {course.modules.map((module) => (
          <div key={module.id} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Lekcja {module.id + 1}</h5>

              <label className="form-label">Nazwa lekcji</label>
              <input type="text" className="form-control" />

              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Paragraf 1</h5>
                  <label className="form-label mt-2">Typ paragrafu</label>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => paragraphType(e, module.id)}
                  >
                    <option value="null">Wybierz typ</option>
                    <option value="Title">Tytuł</option>
                    <option value="Text">Tekst</option>
                    <option value="Important">Ważne</option>
                  </select>

                  {module.paragraphs.map((paragraph) => (
                    <div>{paragraph.type}</div>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary mt-3">
                Dodaj kolejny paragraf
              </button>
            </div>
          </div>
        ))}
        <div className="d-flex flex-column align-items-start">
          <button
            onClick={(e) => addLesson(e)}
            className="btn btn-primary mt-3"
          >
            Dodaj kolejną lekcję
          </button>
          <button type="submit" className="btn btn-success mt-3">
            Stwórz
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddCourse;
