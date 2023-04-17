import { useState } from "react";
import Title from "../../components/course/paragraphs/Title";
import Text from "../../components/course/paragraphs/Text";
import Important from "../../components/course/paragraphs/Important";
import List from "../../components/course/paragraphs/List";
import Code from "../../components/course/paragraphs/Code";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AddCourse() {
  const [course, setCourse] = useState({
    name: "",
    modules: [
      {
        id: 0,
        nazwa: "",
        summary: {
          quiz: {
            pytanie: "",
            odpowiedzi: [
              {
                value: "",
                correct: false,
              },
              {
                value: "",
                correct: false,
              },
              {
                value: "",
                correct: false,
              },
              {
                value: "",
                correct: false,
              },
            ],
          },
          film: "",
          zadanie: "",
        },
        paragraphs: [
          {
            id: 0,
            type: "",
            img: "",
            value: "",
          },
        ],
      },
    ],
    date: new Date().toJSON(),
  });
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const navigate = useNavigate();

  const postCourse = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post(
        `https://examie-default-rtdb.europe-west1.firebasedatabase.app/courses/${course.name.toLowerCase()}.json?auth=${
          auth?.userId === import.meta.env.VITE_PERMISSION ? auth.token : ""
        }`,
        course
      );
      navigate("/courses");
    } catch (error) {
      setError(error);
    }
  };

  const addLesson = (e) => {
    e.preventDefault();

    setCourse({
      ...course,
      modules: [
        ...course.modules,
        {
          id: course.modules.length,
          nazwa: "",
          summary: {
            quiz: {
              pytanie: "",
              odpowiedzi: [
                {
                  value: "",
                  correct: false,
                },
                {
                  value: "",
                  correct: false,
                },
                {
                  value: "",
                  correct: false,
                },
                {
                  value: "",
                  correct: false,
                },
              ],
            },
            film: "",
            zadanie: "",
          },
          paragraphs: [
            {
              id: 0,
              type: "",
              content: "",
            },
          ],
        },
      ],
    });
  };

  const deleteLesson = (e) => {
    e.preventDefault();

    setCourse({
      ...course,
      modules: [...course.modules.slice(0, course.modules.length - 1)],
    });
  };

  const paragraphType = (e, paragraph_id, module_id) => {
    e.preventDefault();

    const newParagraph = [...course.modules];
    newParagraph[module_id].paragraphs[paragraph_id].type = e.target.value;
    setCourse({ ...course, modules: newParagraph });
  };

  const addParagpraph = (e, module_id) => {
    e.preventDefault();

    const newParagraph = [...course.modules];
    newParagraph[module_id].paragraphs = [
      ...newParagraph[module_id].paragraphs,
      {
        id: newParagraph[module_id].paragraphs.length,
        type: "",
        content: "",
      },
    ];
    setCourse({ ...course, modules: newParagraph });
  };

  const deleteParagraph = (e) => {
    e.preventDefault();

    setCourse({
      ...course,
      modules: [
        {
          id: course.modules.length - 1,
          paragraphs: [
            ...course.modules[course.modules.length - 1].paragraphs.slice(
              0,
              course.modules[course.modules.length - 1].paragraphs.length - 1
            ),
          ],
        },
      ],
    });
  };

  const valueSetter = (e, paragraph_id, module_id, type, list) => {
    const newParagraph = [...course.modules];
    switch (type) {
      case "text":
        newParagraph[module_id].paragraphs[paragraph_id].value = e.target.value;
        break;
      case "label":
        newParagraph[module_id].paragraphs[paragraph_id].label = e.target.value;
        break;
      case "img":
        newParagraph[module_id].paragraphs[paragraph_id].img = e.target.value;
        break;
      case "code":
        newParagraph[module_id].paragraphs[paragraph_id].code = e.target.value;
        break;
      case "list":
        newParagraph[module_id].paragraphs[paragraph_id].value = list;
        break;
      case "language":
        newParagraph[module_id].paragraphs[paragraph_id].language =
          e.target.value;
        break;
    }
    setCourse({ ...course, modules: newParagraph });
  };

  return (
    <section className="px-5" style={{ width: "100%" }}>
      <h1>
        Dodawanie kursu: <strong>{course.name}</strong>
      </h1>
      {error && (
        <div className="alert alert-danger mt-3">Nie masz permisji!!</div>
      )}
      <form onSubmit={(e) => postCourse(e)}>
        <div className="mb-3 mt-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nazwa kursu
          </label>
          <input
            type="text"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            className="form-control"
            value={course.name}
            required
          />
        </div>
        {course.modules.map((module) => (
          <div key={module.id} className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Lekcja {module.id + 1}</h5>

              <label className="form-label">Nazwa lekcji</label>
              <input
                onChange={(e) => {
                  const newModules = [...course.modules];
                  newModules[module.id].nazwa = e.target.value;
                  setCourse({ ...course, modules: newModules });
                }}
                value={module.nazwa}
                type="text"
                className="form-control"
              />
              <div className="card mt-3">
                <div className="card-body">
                  <div>
                    <h5 className="card-title">Podsumowanie</h5>
                    <label className="form-label mt-2">Pytanie do Quizu</label>
                    <input
                      onChange={(e) => {
                        const newModules = [...course.modules];
                        newModules[module.id].summary.quiz.pytanie =
                          e.target.value;
                        setCourse({ ...course, modules: newModules });
                      }}
                      value={module[module.id]?.summary.quiz.pytanie}
                      type="text"
                      className="form-control"
                    />
                    <label className="form-label mt-2">Odpowiedź 1</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          onChange={(e) => {
                            const newModules = [...course.modules];
                            newModules[
                              module.id
                            ].summary.quiz.odpowiedzi[0].correct =
                              e.target.checked;
                            setCourse({ ...course, modules: newModules });
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        onChange={(e) => {
                          const newModules = [...course.modules];
                          newModules[
                            module.id
                          ].summary.quiz.odpowiedzi[0].value = e.target.value;
                          setCourse({ ...course, modules: newModules });
                        }}
                        className="form-control"
                      />
                    </div>
                    <label className="form-label mt-2">Odpowiedź 2</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          onChange={(e) => {
                            const newModules = [...course.modules];
                            newModules[
                              module.id
                            ].summary.quiz.odpowiedzi[1].correct =
                              e.target.checked;
                            setCourse({ ...course, modules: newModules });
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        onChange={(e) => {
                          const newModules = [...course.modules];
                          newModules[
                            module.id
                          ].summary.quiz.odpowiedzi[1].value = e.target.value;
                          setCourse({ ...course, modules: newModules });
                        }}
                        className="form-control"
                      />
                    </div>
                    <label className="form-label mt-2">Odpowiedź 3</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          onChange={(e) => {
                            const newModules = [...course.modules];
                            newModules[
                              module.id
                            ].summary.quiz.odpowiedzi[2].correct =
                              e.target.checked;
                            setCourse({ ...course, modules: newModules });
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        onChange={(e) => {
                          const newModules = [...course.modules];
                          newModules[
                            module.id
                          ].summary.quiz.odpowiedzi[2].value = e.target.value;
                          setCourse({ ...course, modules: newModules });
                        }}
                        className="form-control"
                      />
                    </div>
                    <label className="form-label mt-2">Odpowiedź 4</label>
                    <div className="input-group mb-3">
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="checkbox"
                          onChange={(e) => {
                            const newModules = [...course.modules];
                            newModules[
                              module.id
                            ].summary.quiz.odpowiedzi[3].correct =
                              e.target.checked;
                            setCourse({ ...course, modules: newModules });
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        onChange={(e) => {
                          const newModules = [...course.modules];
                          newModules[
                            module.id
                          ].summary.quiz.odpowiedzi[3].value = e.target.value;
                          setCourse({ ...course, modules: newModules });
                        }}
                        className="form-control"
                      />
                    </div>
                    <label className="form-label mt-2">Link do filmu</label>
                    <input
                      value={module[module.id]?.summary.film}
                      onChange={(e) => {
                        const newModules = [...course.modules];
                        newModules[module.id].summary.film = e.target.value;
                        setCourse({ ...course, modules: newModules });
                      }}
                      type="text"
                      className="form-control"
                    />
                    <label className="form-label mt-2">Zadanie</label>
                    <input
                      value={module[module.id]?.summary.zadanie}
                      onChange={(e) => {
                        const newModules = [...course.modules];
                        newModules[module.id].summary.zadanie = e.target.value;
                        setCourse({ ...course, modules: newModules });
                      }}
                      type="text"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              {module.paragraphs.map((paragraph) => (
                <div key={paragraph.id} className="card mt-3">
                  <div className="card-body">
                    <div key={paragraph.id}>
                      <h5 className="card-title">
                        Paragraf {paragraph.id + 1}
                      </h5>
                      <label className="form-label mt-2">Typ paragrafu</label>

                      <select
                        className="form-select"
                        onChange={(e) =>
                          paragraphType(e, paragraph.id, module.id)
                        }
                        value={paragraph.type}
                      >
                        <option value="">Wybierz typ</option>
                        <option value="title">Tytuł</option>
                        <option value="text">Tekst</option>
                        <option value="important">Ważne</option>
                        <option value="list">Lista</option>
                        <option value="code">Kod</option>
                      </select>
                      {paragraph.type === "title" && (
                        <Title
                          content={paragraph.value}
                          img={paragraph.img}
                          setImg={(e) =>
                            valueSetter(e, paragraph.id, module.id, "img")
                          }
                          setContent={(e) =>
                            valueSetter(e, paragraph.id, module.id, "text")
                          }
                        />
                      )}
                      {paragraph.type === "text" && (
                        <Text
                          content={paragraph.value}
                          setContent={(e) => {
                            valueSetter(e, paragraph.id, module.id, "text");
                          }}
                        />
                      )}
                      {paragraph.type === "important" && (
                        <Important
                          content={paragraph.value}
                          setContent={(e) => {
                            valueSetter(e, paragraph.id, module.id, "text");
                          }}
                        />
                      )}
                      {paragraph.type === "list" && (
                        <List
                          content={paragraph.value}
                          label={paragraph.label}
                          setLabel={(e) =>
                            valueSetter(e, paragraph.id, module.id, "label")
                          }
                          setContent={(list) =>
                            valueSetter(
                              null,
                              paragraph.id,
                              module.id,
                              "list",
                              list
                            )
                          }
                        />
                      )}
                      {paragraph.type === "code" && (
                        <Code
                          setContent={(e) =>
                            valueSetter(e, paragraph.id, module.id, "text")
                          }
                          setLanguage={(e) =>
                            valueSetter(e, paragraph.id, module.id, "language")
                          }
                          content={paragraph.value}
                          language={paragraph.language}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex gap-2">
                <button
                  onClick={(e) => addParagpraph(e, module.id)}
                  className="btn btn-primary mt-3"
                >
                  Dodaj kolejny paragraf
                </button>
                {module.paragraphs.length > 1 && (
                  <button
                    onClick={(e) => deleteParagraph(e)}
                    className="btn btn-danger mt-3"
                  >
                    Usuń paragraf
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex flex-column align-items-start">
          <div className="d-flex gap-2">
            <button
              onClick={(e) => addLesson(e)}
              className="btn btn-primary mt-3"
            >
              Dodaj kolejną lekcję
            </button>
            {course.modules.length > 1 && (
              <button
                onClick={(e) => deleteLesson(e)}
                className="btn btn-danger mt-3"
              >
                Usuń lekcję
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Dodaj
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddCourse;
