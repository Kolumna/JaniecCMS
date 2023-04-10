const Title = (props) => {
  return (
    <div>
      <label className="form-label mt-2">Link do zdjęcia</label>
      <input value={props.img} className="form-control" />
      <div className="mt-2">
        <img src={props.img} width={100} />
      </div>
      <label className="form-label mt-2">Treść</label>
      <textarea value={props.content} className="form-control" />
    </div>
  );
};
export default Title;
