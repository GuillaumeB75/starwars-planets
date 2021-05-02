import { useState, useEffect } from "react"

function App() {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const handleButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Données non récupérées."
        );
      })
      .then((data) => {
        console.log(data);
        setPlanets(planets => [...planets, ...data.results]);
        setHasNext(!!data.next);
      })
      .catch((error) => console.log(error.message));
  }, [page]);

  return (
    <section className="container py-5" font-family= "Krona One, sans - serif">
      <h1 className="mb-5">Planètes dans l'univers Star Wars</h1>
      <div className="row">
        {planets.map((planet) => {
          return (
            <div key={planet.name} className="col-md-6  col-lg-4 col-xl-3 mb-4">
              <article className="bg-warning p-3">
                <h2 className="h5">{planet.name}</h2>
                <p className="mb-0">
                  <b>population</b> <br /> {planet.population}
                </p>
                <p className="mb-0">
                  <b>climat</b> <br /> {planet.climate}
                </p>
              </article>
            </div>
          );
        })}
        
      </div>
      {hasNext && (
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleButtonClick}
        
        >Suivantes
        </button>
      )}
    </section>
  );
}

export default App;