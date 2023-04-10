const Text = (props) => {
  return (
    <div>
      <label className="form-label mt-2">Treść</label>
      <textarea onChange={(e) => props.setContent(e)} value={props.content} className="form-control" />
    </div>
  );
};
export default Text;
