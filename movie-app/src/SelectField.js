const SelectField = ({label, name, id, options, field, handleInputOnChange, handleInputBlur, errorMessage, reference, required}) => {
    return(
<div className={`mb-3 ${errorMessage[name] !== '' ? 'was-validated' : ''}`}>
                <label htmlFor={id} className="form-label">{label}</label>
                <select
                id={id}
                name={name}
                className="form-select mb-3"
                value={field[name]}
                onChange={handleInputOnChange}
                onBlur={handleInputBlur}
                ref={reference}
                required={required}
                >
                {options.map((option) => (
                    <option value={option.value} key={option.value}>{option.text ? option.text: option.value}</option>
                ))}
                </select>
                <div className="invalid-feedback">{errorMessage[name]}</div>
            </div>
    );

}

export default SelectField;