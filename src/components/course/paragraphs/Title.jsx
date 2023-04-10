const Title = (props) => {
  return (
    <div>
      <label className="form-label mt-2">Link do zdjęcia</label>
      <input onChange={(e) => props.setImg(e)} value={props.img} className="form-control" />
      {props.img && (
        <div className="mt-2">
          <img src={props.img} width={100} />
        </div>
      )}
      <label className="form-label mt-2">Treść</label>
      <textarea onChange={(e) => props.setContent(e)} value={props.content} className="form-control" />
    </div>
  );
};
export default Title;
