const Important = (props) => {
  return (
    <div>
      <label className="form-label mt-2">Treść</label>
      <textarea value={props.content} className="form-control" />
    </div>
  );
};
export default Important;
