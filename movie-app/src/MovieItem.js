const MovieItem = ({ title, category, age, oscars, hungarian }) => {
    return (
      <>
        <td className="text-center">{title}</td>
        <td className="text-center">{category}</td>
        <td className="text-center">{age}</td>
        <td className="text-center">{oscars}</td>
        <td className="text-center">{hungarian ? '✔️' : '❌'}</td>
      </>
    );
  };
  
  export default MovieItem;