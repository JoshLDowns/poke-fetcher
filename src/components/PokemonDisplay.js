import React from "react";

function PokemonDisplay(props) {
  console.log(props);
  return (
    <div>
      {props.pokemonInfo ? (
        <div>
          <img src={props.pokemonInfo.sprite} alt="pokemon" />
          <h2>{props.pokemonInfo.name}</h2>
          <p>{props.pokemonInfo.types.map((obj) => obj.type.name).join("/")}</p>
          <p>Height: {props.pokemonInfo.height}</p>
          <p>Weight: {props.pokemonInfo.weight}</p>
        </div>
      ) : (
        <p>...loading</p>
      )}
    </div>
  );
}

export default PokemonDisplay;
