import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export const Pokemon = () => {
  const params = useParams();
  const { data } = useQuery(
    ["pokemons", params.name],
    () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`).then(
        (response) => response.json()
      ),
    { cacheTime: 30000 }
  );
  return (
    <div>
      Pokemon:{params.name}
      <img alt="" src={data?.sprites.front_default} />
      <Link to="/">Go home</Link>
    </div>
  );
};
