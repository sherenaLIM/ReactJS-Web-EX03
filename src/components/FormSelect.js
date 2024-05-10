function FormSelect({
    labelId,
    labelCaption,
    selectedValue,
    selectData = ["Female", "Male", "Non-Binary"],
    onChange,
  }) {

    const options = selectData.map((value, index) => {
      return (
        <option key={index} value={value}>
          {value}
        </option>
      );
    });
   
    return (
      <div className="row">
        <div className="col-25">
          <label htmlFor={labelId}>{labelCaption}</label>
        </div>
        <div className="col-75">
          <select id={labelId} onChange={onChange} value={selectedValue}>
            {options}
          </select>
        </div>
      </div>
    );
  }
   
  export default FormSelect;