const RadioButtonField = ({type, id,checked, field, name, label, reference, required, handleInputOnChange }) => {

    return(
        <div className="form-check">
  <input
  className="form-check-input"
  type={type}
  name={name}
  id={id}
  value={field}
  onChange={handleInputOnChange}
  ref={reference}
  required={required}
  checked={checked}
  />
  <label className="form-check-label" htmlFor={id}>
    {label}
  </label>
  </div>

    );
}

export default RadioButtonField;