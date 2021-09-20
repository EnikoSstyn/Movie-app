import React, { useEffect, useState } from 'react';

export default function StatisticTable(props) {
  const { movies, categories } = props;
  const [numOfCategory, setNumOfCategory] = useState({});
  const [percent, setPercent] = useState({});
  const [mostOfOscars, setMostOfOscars] = useState([]);
 
 useEffect(() => {
   filterCategory();
   mostOscars();
 },[movies]);

 async function filterCategory() {
    let numbers = {}
    
    movies.forEach((movie) => 
    numbers[movie.category] 
          ? (numbers[movie.category] = numbers[movie.category] + 1)
          : (numbers[movie.category] = 1) 
        );
        
        setNumOfCategory(numbers);
        percentCategory(numbers);
        
    }

    // function filterCat(category) {
    //   let counter = 0;
    //   movies.forEach((movie) =>{
    //     if(movie.category === category){
    //       counter = counter + 1;
    //     }
    //   });
    //   return counter;
    // }

  function percentCategory(numbers) {
    let sumCategory = 0;
    for(const key in numbers) {
      sumCategory = sumCategory + numbers[key];
    }

    let categoriessPercent = {};
    for(const key in numbers){
      categoriessPercent[key] = Math.round((numbers[key] * 100) / sumCategory);
    }
    setPercent(categoriessPercent);
  }

  function mostOscars() {
    const mostOscars = Math.max(...movies.map(movie => movie.oscars));

   
    movies.filter(movie => {
       if(movie.oscars === mostOscars){
         setMostOfOscars(movie.title);
        }
    });

  }
 
  return (
    <>
      <h2>Statistics</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Number of movies</th>
            <th>Movies with age limit</th>
            <th>Number of all Oscars</th>
            <th>Movies with hungarian audio</th>
            <th>Movie with the most number of Oscars</th>
            <th>Movies rate with hungarian audio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{movies.length}</td>
            <td>{movies.filter(movie => movie.age === 18).length}</td>
            <td>{movies.reduce((prevValue, currentValue) => prevValue + currentValue.oscars, 0)}</td>
            <td>{movies.filter(movie => movie.hungarian === true).length}</td>
            <td>{mostOfOscars}</td>
            <td>{Math.round((movies.filter(movie => movie.hungarian === true).length * 100) / movies.length)+ '%'}</td>
          </tr>
        </tbody>
      </table>
      <h2>Statistic about categories</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            {Object.entries(numOfCategory).map((item) => {
              let categoryTitle = item[0];
              let title =
                categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1);

              return <th key={item[0]}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.entries(numOfCategory).map((item) => {
              let categoryNumber = item[1];

              return <th key={item[0] + item[1]}>{categoryNumber}</th>;
            })}
          </tr>
          <tr>
          {Object.entries(percent).map((item, index) => {
            let categoryPercent = item[1];
            return <th key={item[0] + index}>{categoryPercent + '%'}</th>
          })}
          </tr>
        </tbody>
      </table>
    </>
  );
}