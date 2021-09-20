import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext'
import MovieItem from './MovieItem';
import { db } from './firebase';
import RadioButtonField from './RadioButtonField';
import DeleteModal from './DeleteModal';
import 'bootstrap';
import StatisticTable from './StatisticTable';
import Navbar from './Navbar';

export default function Dashboard() {
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryValue, setCategoryValue] = useState();
    const [deleteBtnId, setDeleteBtnId] = useState(null);
    
    const handleLogout = async() => {
        setError('');

        try {
            await logout()
            history.push('/login')
        } catch {
            setError('Failed to log out')
        }
    }
    const dataSnapshot = (snapshot) => {
        const items= [];
        snapshot.docs.forEach((item) => {
            const docItem = item.data();
            docItem['docId'] = item.id;
            items.push(docItem);
        });
        setMovies(items);
    }

    useEffect(() => {
        const unsubscribe = db.collection('movies').onSnapshot(dataSnapshot);
        return () => {
            unsubscribe();
        }
    },[]);

    useEffect(() => {
        db.collection('movies').get()
        .then((querySnapshot) => {
            const uniqueCategory = [];
            querySnapshot.docs.forEach(doc => {
                const movies = doc.data();
                if(!uniqueCategory.includes(movies.category)){
                    uniqueCategory.push(movies.category);
                }
            });
            setCategories(uniqueCategory);
            
        })
    },[]);


    const handleCategoryChange = (e) => {
        const value = e.target.value;
        const ref = db.collection('movies');
        setCategoryValue(value);
         if(value !== '') {
            ref.where('category', '==', value)
            .get()
            .then(dataSnapshot)
             setCategoryValue(value);
         } else {
            ref.get()
             .then(dataSnapshot);
     }
    }

    const handleCheckboxFilter= (e) => {
        const checked = e.target.checked;
        const ref = db.collection('movies');

        if(checked) {
            ref.where('age', '==', 18)
            .get()
            .then(dataSnapshot)
        } else {
            ref.get()
            .then(dataSnapshot)
        }
    }

    const handleRadioOnChange = (e) => {
        const value = e.target.value;
        const ref = db.collection('movies');
        if(value === 'hun'){
            ref.where('hungarian', '==', true)
            .get()
            .then(dataSnapshot)
        } else {
            ref.get()
            .then(dataSnapshot)
        }
    }

    const handleInputOnChange = (e) => {
        const value = e.target.value;
        const ref = db.collection('movies');
        ref.where('title', '>=', value)
           .where('title', '<=', value + '\uf88f')
           .get()
           .then(dataSnapshot)
        
    }

    const handleRegOnclick = (e) => {
        e.preventDefault();
        history.push('/newmovie');
        
    }

    const handleDeleteOnclick = (e) => {
        e.preventDefault();
        const ref = db.collection('movies');
        const id = deleteBtnId;
        
        ref.doc(id).delete()
        .then(() => {
            console.log("Document succesfully deleted!");
        }).catch((error) => {
            console.error("Error removing document:", error);
        });


    }

    const handleEditOnclick = (e) => {
        e.preventDefault();
        
        history.push({
            pathname: '/editmovie',
            id: e.target.id
        });
    }

    const handleSetId = (e) => {
        setDeleteBtnId(e.target.id)
    }

    return (
        <>
        <main className="container">
            <Navbar
            handleLogout = {handleLogout}
            categories= {categories}
            handleCategoryChange={handleCategoryChange}
            handleInputOnChange={handleInputOnChange}
            />
            <h5 className="mb-5">Welcome {currentUser.email}</h5>
            
            {error && <div className={`alert mt-3 alert-danger`} role="alert">{error}</div>}
            <div className="d-flex mt-3">
            <label htmlFor="categorySelector" className="form-label">Movies about categories</label>
            <select
            id="categorySelector"
            className='form-select'
            value={categoryValue}
            name="category"
            onChange={handleCategoryChange}
            >
              <option value=''>Choose!</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
            </div>
            <div>
      <input
            className="custom-control-input me-3"
            name="check"
            type="checkbox"
            id="invalidCheck"
            onChange={handleCheckboxFilter}
            
          />
          <label className="form-check-label" htmlFor='invalidCheck'>
            Above 18 years old
          </label>
      </div>
      <div>
      <RadioButtonField
                type="radio"
                label="With hungarian audio"
                id="hun"
                name="radio"
                field="hun"
                handleInputOnChange={handleRadioOnChange}
                />
                 <RadioButtonField
                type="radio"
                label="All movies"
                id="any"
                name="radio"
                field="any"
                handleInputOnChange={handleRadioOnChange}
                />
      </div>
      <div>
      <label htmlFor="search" className="form-label">Search</label>
      <input
      className="form-control mb-3"
      type="text"
      name="search"
      placeholder="Movie title"
      onChange={handleInputOnChange}
                 
        />
      </div>
            <table className="table table-striped">
                <thead>
                    <tr className="text-center">
                        <th>Movie title</th>
                        <th>Category</th>
                        <th>Age Limit</th>
                        <th>Numbers of Oscars</th>
                        <th>Hunagrian voice</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((item) => (
                        <tr key={item.docId}>
                            <MovieItem
                            title={item.title}
                            category={item.category}
                            age={item.age}
                            oscars={item.oscars}
                            hungarian={item.hungarian}
                            />
                            <td>
                                <button className="btn btn-primary me-3" onClick={handleEditOnclick} id={item.docId}>Edit</button>
                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#myModal" id={item.docId} onClick={handleSetId}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-info" onClick={handleRegOnclick}>Add a new movie</button>
            <DeleteModal handleDeleteOnclick={handleDeleteOnclick}  />
        <div>
        <StatisticTable movies={movies} categories={categories} />
        </div>
        </main>
        </>
    )
}
