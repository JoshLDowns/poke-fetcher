import React, { Component } from "react";

class List extends Component {
  render() {
    //const { results, onPokemonClick } = this.props;
    return (
      <div>
        {this.props.results ? (
          this.props.results.map((pokemon) => (
            <div
              key={pokemon.name}
              onClick={() => {
                this.props.onPokemonClick(pokemon.url);
              }}
            >
              {pokemon.name}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default List;
