import { useEffect, useState } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";

const ANIMALS = ["cat", "dog", "bird", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [BREEDS] = useBreedList(animal);

  useEffect(() => {
    requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <label>
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label>
          Breed
          <select
            id="breed"
            value={breed}
            disabled={BREEDS.length === 0}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option />
            {BREEDS.map((breed) => (
              <option key={breed}> {breed}</option>
            ))}
          </select>
        </label>
        <button>submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
