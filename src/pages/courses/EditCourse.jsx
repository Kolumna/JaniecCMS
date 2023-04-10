import { useEffect, useState } from "react";
import Title from "../../components/course/paragraphs/Title";
import Text from "../../components/course/paragraphs/Text";
import Important from "../../components/course/paragraphs/Important";
import List from "../../components/course/paragraphs/List";
import Code from "../../components/course/paragraphs/Code";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { nestedObjectToArray } from "../../helpers/nestedObject";

function EditCourse() {
  const [course, setCourse] = useState({
    name: "",
    modules: [
      {
        id: 0,
        nazwa: "",
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
  });

  const { id, courseName } = useParams();

  const navigate = useNavigate();

  const getCourse = async () => {
    const res = await axios.get(
      `https://examie-default-rtdb.europe-west1.firebasedatabase.app/courses/${courseName}/${id}.json`
    );
    setCourse(res.data);
  };

  const patchCourse = async (e) => {
    e.preventDefault();

    await axios.patch(
      `https://examie-default-rtdb.europe-west1.firebasedatabase.app/courses/${courseName}/${id}.json`,
      JSON.stringify({ ...course, editDate: new Date().toJSON() })
    );

    navigate("/courses");
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

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <section className="px-5" style={{ width: "100%" }}>
      <h1>
        Edycja kursu: <strong>{course.name}</strong>
      </h1>
      <form onSubmit={(e) => patchCourse(e)}>
        <div className="mb-3">
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
                          setImg={(e) => {
                            const newParagrapfs = [
                              ...course.modules.paragraphs[module.id],
                            ];
                            newParagrapfs[paragraph.id].img = e.target.value;
                            setCourse({
                              ...course,
                              modules: [
                                {
                                  ...course.modules[module.id],
                                  paragraphs: newParagrapfs,
                                },
                              ],
                            });
                          }}
                          setContent={(e) => {
                            const newParagrapfs = [
                              ...(course.modules[module.id].paragraphs ?? []),
                            ];
                            newParagrapfs[paragraph.id].value = e.target.value;
                            setCourse({
                              ...course,
                              modules: [
                                {
                                  ...course.modules[module.id],
                                  paragraphs: newParagrapfs,
                                },
                              ],
                            });
                          }}
                        />
                      )}
                      {paragraph.type === "text" && (
                        <Text
                          content={paragraph.value}
                          setContent={(e) => {
                            const newParagrapfs = [
                              ...course.modules[module.id].paragraphs,
                            ];
                            newParagrapfs[paragraph.id].value = e.target.value;
                            setCourse({
                              ...course,
                              modules: [
                                {
                                  ...course.modules[module.id],
                                  paragraphs: newParagrapfs,
                                },
                              ],
                            });
                          }}
                        />
                      )}
                      {paragraph.type === "important" && (
                        <Important content={paragraph.value} />
                      )}
                      {paragraph.type === "list" && (
                        <List
                          content={[...paragraph.value]}
                          label={paragraph.label}
                        />
                      )}
                      {paragraph.type === "code" && (
                        <Code
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
            Zaaktualizuj
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditCourse;
