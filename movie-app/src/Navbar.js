import React from 'react'

export default function Navbar({ handleLogout, categories, handleCategoryChange, handleInputOnChange}) {

    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
  <div className="container-fluid">
    <p className="navbar-brand">Movie Catalogue</p>
    <button className="navbar-toggler me-5" type="button" data-bs-toggle="collapse" data-bs-target="#mainMenu">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mainMenu">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><button className="dropdown-item" type="button" onClick={handleCategoryChange} value="" >All movies</button></li>
          {categories.map((item) => (
              <li><button className="dropdown-item" type="button" onClick={handleCategoryChange} key={item} value={item}>
                {item}
                </button></li>
            ))}
          </ul>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Movie title" onChange={handleInputOnChange}/>
      </form>
    </div>
    <button className="d-inline mx-3 btn btn-info" onClick={handleLogout}>Log out</button>
  </div>
  
</nav>
    )
}
