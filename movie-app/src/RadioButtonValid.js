const RadioButtonValid = ({type, id,checked, field, name, label, reference, required, handleInputOnChange, errorMessage }) => {

return(
<div className={`form-check mb-3 ${errorMessage[name] !== '' ? "was-validated" : ""}`}>
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
  <div className="invalid-feedback">
    {errorMessage[name]}
  </div>
  </div>

    );
}

export default RadioButtonValid;