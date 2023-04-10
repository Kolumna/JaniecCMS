const Code = (props) => {
  return (
    <div>
      <label className="form-label mt-2">Język</label>
      <select
        className="form-select"
        value={props.language}
        onChange={(e) => props.setLanguage(e)}
      >
        <option value="">Wybierz język</option>
        <option value="javascript">JavaScript</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="php">PHP</option>
        <option value="sql">SQL</option>
      </select>
      <label className="form-label mt-2">Kod</label>
      <textarea value={props.content} onChange={(e) => props.setContent(e)} className="form-control" />
    </div>
  );
};
export default Code;
