import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { css } from "@emotion/css/macro";

const core = css`
  font-family: monospace;
`

const roundedBorders = (size) => css`
  border-radius: ${size}px;
`

const wrapper = css`
  ${core}
  ${roundedBorders(20)}
  margin: 20px;
  border: 1px solid black;
  background: gray;

  &:hover {
    background: green;
  }

  & li {
    font-size: 34px;
  }
`;

function App() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["pokemons"],
      async ({
        pageParam = "https://pokeapi.co/api/v2/pokemon?offset=1100&limit=20",
      }) => {
        const request = await fetch(pageParam);
        const { results, next } = await request.json();
        return { response: results, nextPage: next };
      },

      { getNextPageParam: (lastPage) => lastPage.nextPage }
    );

  return (
    <div className={wrapper}>
      <h1>Pokemon List</h1>
      {isFetchingNextPage && <p>Loading...</p>}
      <div className="pokemon-container">
        <ul className="all-container">
          {data?.pages.map((page) =>
            page.response.map((pokemon) => (
              <li key={pokemon.name}>
                <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              </li>
            ))
          )}
        </ul>
        {hasNextPage && (
          <button className={css`${roundedBorders(5)}`} onClick={() => fetchNextPage()}>Load more</button>
        )}
      </div>
    </div>
  );
}

export default App;
