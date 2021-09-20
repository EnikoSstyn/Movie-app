const InputField = ({type, placeholder, label, name, field, handleInputOnChange, handleInputBlur, errorMessage, reference, required}) => {

    return(
        
        <div className= {`mb-3 ${errorMessage[name] !== '' ? "was-validated" : ""}`}>
            <label htmlFor={name} className="form-label">{label}</label>
            <input 
            type={type}
            className="form-control mb-3"
            id={name}
            name={name}
            value={field}
            placeholder={placeholder}
            onChange={handleInputOnChange}
            onBlur={handleInputBlur}
            ref={reference}
            required={required}
            />
            <div className="invalid-feedback">
                {errorMessage[name]}
            </div>
        </div>
)
}

export default InputField;