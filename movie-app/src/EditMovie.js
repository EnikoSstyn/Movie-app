import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { db } from './firebase';
import InputField from './InputField';
import SelectField from './SelectField';
import RadioButtonField from './RadioButtonField';


export default function EditMovie() {
    const [data, setData] = useState({});
    const { id } = useLocation();
    const history = useHistory();
    const [formWasValidated, setFormWasValidated] = useState(false);
    
 
    const [errorMessages, setErrorMessages] = useState({
        title:'',
        category:'',
        age:'',
        oscars:'',
        hungarian: false
    });

    const references = {
        title: useRef(),
        category: useRef(),
        age: useRef(),
        oscars: useRef(), 
        hungarian: useRef()
    }
    
    const validators = {
        title: {
            required: isNotEmpty
        },
        category: {
            required: isNotEmpty
        },
        age: {
            required: isNotEmpty
        },
        oscars: {
            required: isNotEmpty
        }
    }

    function isNotEmpty(value){
        return value !== '';
    }

    const errorTypes = {
        required: 'Missing field'
    }

    const categories = [
        {
            value: "",
            text: "Choose!"
        },
        {
            value: "comedy"
        },
        {
            value: "horror"
        },
        {
            value: "drama"
        },
        {
            value: "action"
        },
        {
            value: "thriller"
        },
        {
            value: "romantic"
        },
        {
            value: "sci-fi"
        },
        {
            value: "gengster movie"
        },
        {
            value: "adventure"
        },
    ];

    useEffect(() => {
        db.collection('movies').doc(id)
        .get()
        .then((querySnapshot) => {
            const oldData = querySnapshot.data();
            setData({
                ...oldData,
                age: String(oldData.age)
            })
        })
    }, [id]);
    
    const handleBackOnclick= (e) => {
        e.preventDefault();

        history.push('/');
    }

    const handleInputOnChange = (e) => {
        const value = e.target.value;
      
         setData({
             ...data,
            [e.target.name]: value
         })
    }

    const handleCheckbox = (e) => {
        const checked = e.target.checked;
       
             setData({
                ...data,
                hungarian: checked
        })
        
    }

    const handleInputBlur = (e) => {
        const name = e.target.name;
        
        validateField(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = isFormValid();
        
        if(isValid){
        db.collection('movies').doc(id)
        .set({
            title:data.title,
            category: data.category,
            age: parseInt(data.age),
            oscars: parseInt(data.oscars),
            hungarian: data.hungarian
        })
        .then((doc) => {
            setData({
                title:'',
                category:'',
                age:'',
                oscars:'',
                hungarian: false                
            })
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    }

    const isFormValid = () => {
        let isFormValid = true;
        for (const fieldName of Object.keys(data)) {
            const isFieldValid = validateField(fieldName);
            if(!isFieldValid) {
                isFormValid = false;
            }
        }
        return isFormValid;
    }
    
    const validateField = (fieldName) => {
        const value = data[fieldName];
        let isValid = true;
        setErrorMessages((prevState) => ({
            ...prevState,
            [fieldName]: '',
        }));
        references[fieldName].current.setCustomValidity('');
    
        if(validators[fieldName] !== undefined) {
            
            for(const [validationType, validatorFn] of Object.entries(validators[fieldName])) {
                if(isValid) {
                    isValid = validatorFn(value);
                    if(!isValid) {
                        const errorText = errorTypes[validationType];
                        setErrorMessages((prevState) => {
                            return({
                                ...prevState,
                                [fieldName]: errorText,
                            })
                        });
                        references[fieldName].current.setCustomValidity(errorText);
                    }
                }
            }
        }
        return isValid;
    }

    return (
            <main>
             <div>
          <button className="btn btn-info mb-3 mt-3" onClick={handleBackOnclick}>Back to the homepage</button>
          </div>
            <h1>Edit movie</h1>
            <form className={`needs-validation ${formWasValidated ? 'was-validated' : ''}`} noValidate={true} onSubmit={handleSubmit}>
            <div>
            <InputField
                 type="text"
                 label="Movie title"
                 reference={references['title']}
                 name="title"
                 handleInputOnChange={handleInputOnChange}
                 field={data['title']}
                 errorMessage={errorMessages}
                 required={true}
                 handleInputBlur={handleInputBlur} 
        />
        <div className="d-flex mt-3">
            <SelectField
            id="categorySelector"
            field={data}
            label="Category"
            name="category"
            handleInputOnChange={handleInputOnChange}
            handleInputBlur={handleInputBlur}
            errorMessage={errorMessages}
            options={categories}
            required={true}
            reference={references.category}
            />
            </div>
            <div>
                <h2>Age limit</h2>
            <RadioButtonField
                type="radio"
                label="12"
                id="age12"
                name="age"
                reference={references['age']}
                field="12"
                handleInputOnChange={handleInputOnChange}
                errorMessage={errorMessages}
                required={true}
                checked={data.age === "12"}
                />
                <RadioButtonField
                type="radio"
                label="16"
                id="age16"
                name="age"
                reference={references['age']}
                field="16"
                handleInputOnChange={handleInputOnChange}
                errorMessage={errorMessages}
                checked={data.age === "16"}
                />
                <RadioButtonField
                type="radio"
                label="18"
                id="age18"
                name="age"
                reference={references['age']}
                field="18"
                handleInputOnChange={handleInputOnChange}
                errorMessage={errorMessages}
                checked={data.age === "18"}
                />
            </div>             
        <InputField
                 type="number"
                 label="Numbers of Oscars"
                 reference={references['oscars']}
                 name="oscars"
                 handleInputOnChange={handleInputOnChange}
                 field={data['oscars']}
                 errorMessage={errorMessages}
                 required={true}
                 handleInputBlur={handleInputBlur}
        />
        <input
            className="custom-control-input me-3 mb-3"
            name="check"
            type="checkbox"
            id="invalidCheck"
            onChange={handleCheckbox}
            checked={data.hungarian}
            ref={references.hungarian}
          />
          <label className="form-check-label" htmlFor='invalidCheck'>
            Hungarian audio
          </label>
          <div>
          <button type="submit" className="btn btn-info mt-3" >Save</button>
          </div>
        </div>
        </form>
        </main>
        
    )
}
