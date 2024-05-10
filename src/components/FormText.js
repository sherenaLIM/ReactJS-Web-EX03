function FormText({ 
    labelId, 
    labelCaption, 
    inputText, 
    onChange 
}) {
    return (
      <div className="row">
        <div className="col-25">
          <label htmlFor={labelId}>{labelCaption}</label>
        </div>
        <div className="col-75">
          <input id={labelId} type="text" value={inputText} onChange={onChange} />
        </div>
      </div>
    );
  }
   
  export default FormText;