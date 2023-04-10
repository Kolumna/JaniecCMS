import { useEffect, useState } from "react";

const List = (props) => {
  const [list, setList] = useState([...props.content] ?? []);
  const [item, setItem] = useState("");

  const addToList = (e) => {
    e.preventDefault();

    const newList = [...list];
    newList.push(item);
    setList(newList);
    setItem("");
  };

  useEffect(() => {
    props.setContent(list);
    console.log(list, 'przeysylam')
  }, [list]);

  console.log(list);
  return (
    <div>
      <label className="form-label mt-2">Napis</label>
      <input onChange={(e) => props.setLabel(e)} value={props.label} className="form-control" />
      <label className="form-label mt-2">Lista</label>
      {list.map((item, index) => {
        return (
          <div className="d-flex mt-3 gap-2" key={index}>
            <input
              value={item}
              className="form-control"
              onChange={(e) => {
                const newList = [...list];
                newList[index] = e.target.value;
                setList(newList);
              }}
            />
            <button
              className="btn btn-danger mt-2"
              onClick={() => {
                const newList = [...list];
                newList.splice(index, 1);
                setList(newList);
              }}
            >
              Usuń
            </button>
          </div>
        );
      })}
      <label className="mt-3">Nowy</label>
      <div className="d-flex gap-2 mt-2">
        <input
          value={item}
          className="form-control"
          onChange={(e) => setItem(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={(e) => addToList(e)}>
          Dodaj
        </button>
      </div>
    </div>
  );
};
export default List;
